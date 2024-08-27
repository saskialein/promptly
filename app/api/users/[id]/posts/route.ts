import { connectToDB } from '@utils/database'
import Prompt from '@models/prompt'

type Params = {
  id: string
}

export const GET = async (_req: Request, { params }: { params: Params }) => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({
      creator: params.id,
    }).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (err) {
    console.error("Error fetching prompts:", err)
    return new Response('Failed to fetch all prompts.', {
      status: 500,
    })
  }
}
