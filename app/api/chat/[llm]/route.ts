import { createOpenAI } from '@ai-sdk/openai'
import { createAnthropic } from '@ai-sdk/anthropic'
import { createGoogleGenerativeAI } from '@ai-sdk/google'
import { createCohere } from '@ai-sdk/cohere'
import { createMistral } from '@ai-sdk/mistral'
import { authOptions } from '@app/api/auth/[...nextauth]/route'
import { ApiKey } from '@app/api/user/api-keys/route'
import User from '@models/user'
import { convertToCoreMessages, streamText } from 'ai'
import { getServerSession } from 'next-auth'
import { connectToDB } from '@app/lib/db'

export type LLMProvider =
  | 'openai'
  | 'anthropic'
  | 'meta'
  | 'google'
  | 'cohere'
  | 'mistral'

type Params = {
  llm: LLMProvider
}

const modelMapping: Record<LLMProvider, string> = {
  openai: 'gpt-4o-mini',
  anthropic: 'claude-3-5-sonnet-20240620',
  meta: 'llama3-70b-8192',
  google: 'gemini-1.5-pro-latest',
  cohere: 'command-r-plus',
  mistral: 'mistral-large-latest',
}

const clientMapping: Record<LLMProvider, (options: { apiKey: string }) => any> =
  {
    openai: ({ apiKey }) => createOpenAI({ apiKey, compatibility: 'strict' }),
    anthropic: ({ apiKey }) => createAnthropic({ apiKey }),
    meta: ({ apiKey }) =>
      createOpenAI({
        apiKey,
        baseURL: 'https://api.groq.com/openai/v1',
      }),
    google: ({ apiKey }) => createGoogleGenerativeAI({ apiKey }),
    cohere: ({ apiKey }) => createCohere({ apiKey }),
    mistral: ({ apiKey }) => createMistral({ apiKey }),
  }

export async function POST(req: Request, { params }: { params: Params }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { llm } = params
  const { messages } = await req.json()

  try {
    await connectToDB()

    const user = await User.findOne({ email: session.user.email })

    if (!user || !user.apiKeys) {
      return new Response('No API keys found', { status: 404 })
    }

    const apiKey = user.apiKeys.find(
      (key: ApiKey) => key.provider === llm,
    )?.apiKey

    if (!apiKey) {
      return new Response(`No API key found for provider: ${llm}`, {
        status: 404,
      })
    }

    console.log(apiKey)
    const client = clientMapping[llm]({
      apiKey,
    })
    const model = modelMapping[llm]

    const additionalSettings =
      llm === 'mistral'
        ? { safePrompt: true }
        : {};

    const result = await streamText({
      model: client(model, additionalSettings),
      system: 'You are a helpful assistant.',
      messages: convertToCoreMessages(messages),
    })

    return result.toDataStreamResponse()
  } catch (err) {
    console.error('Error in POST /api/chat/[provider]:', err)
    return new Response(`Error: ${err}`, { status: 500 })
  }
}
