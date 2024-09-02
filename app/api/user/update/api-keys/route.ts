import User from '@models/user'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@app/api/auth/[...nextauth]/route'
import { connectToDB } from '@app/lib/db'
import { encryptApiKey } from '@app/lib/utils'

export const PATCH = async (req: Request) => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return new Response('Unauthorized', { status: 401 })
  }

  const { apiKeys } = await req.json()

  if (!apiKeys || !Array.isArray(apiKeys) || apiKeys.length === 0) {
    return new Response('Invalid API keys data', { status: 400 })
  }

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
    const apiKeyData = apiKeys[0]
    const existingKeyIndex = user.apiKeys.findIndex(
      (key: { provider: string }) => key.provider === apiKeyData.provider,
    )

    const { iv, encryptedData } = encryptApiKey(apiKeyData.apiKey)

    if (existingKeyIndex > -1) {
      // If provider exists, update the key with encryption
      user.apiKeys[existingKeyIndex] = {
        provider: apiKeyData.provider,
        apiKey: encryptedData,
        iv,
      }
    } else {
      // If provider does not exist, add the new key
      user.apiKeys.push({
        provider: apiKeyData.provider,
        apiKey: encryptedData,
        iv,
      })
    }

    await user.save()
    return new Response('User updated successfully.', {
      status: 200,
    })
  } catch (error) {
    return new Response('Failed to update user', { status: 500 })
  }
}
