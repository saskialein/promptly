import { connectToDB } from '@app/lib/db'
import Prompt from '@models/prompt'

export const GET = async () => {
  try {
    await connectToDB()

    const prompts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), { status: 200 })
  } catch (err) {
    return new Response('Failed to fetch all prompts.', {
      status: 500,
    })
  }
}
