import { connectToDB } from '@utils/database'
import User from '@models/user'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@app/api/auth/[...nextauth]/route'

export const PATCH = async (req: Request) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { apiKeys } = await req.json()

  try {
    await connectToDB()

    const user = await User.findOne({ email: session.user?.email })

    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    if (!user.apiKeys) {
      user.apiKeys = []
    }

    // Check if the provider already exists
    const existingKeyIndex = user.apiKeys.findIndex(
      (key: { provider: string; apiKey: string }) =>
        key.provider === apiKeys[0].provider,
    )

    if (existingKeyIndex > -1) {
      // If provider exists, update the key
      user.apiKeys[existingKeyIndex].apiKey = apiKeys[0].apiKey
    } else {
      // If provider does not exist, add the new key
      user.apiKeys.push(apiKeys[0])
    }

    await user.save()

    return new Response("User updated successfully.", {
      status: 200,
    })
  } catch (error) {
    return new Response('Failed to update user', { status: 500 })
  }
}
