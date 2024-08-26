import { authOptions } from '@app/api/auth/[...nextauth]/route'
import User from '@models/user'
import { connectToDB } from '@utils/database'
import { getServerSession } from 'next-auth'

export type ApiKey = {
  provider: "openai" | "anthropic" | "meta"
  apiKey: string
}

const maskApiKey = (key: string) => {
  return key.slice(0, 6) + key.slice(6, -4).replace(/./g, '*') + key.slice(-4)
}

export const GET = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  await connectToDB()
  const user = await User.findOne({ email: session.user?.email })

  if (!user) {
    return new Response('User not found', { status: 404 })
  }

  const maskedKeys = user.apiKeys.map((key: ApiKey) => ({
    provider: key.provider,
    sensitive_id: maskApiKey(key.apiKey),
  }))

  return new Response(JSON.stringify(maskedKeys), { status: 200 })
}
