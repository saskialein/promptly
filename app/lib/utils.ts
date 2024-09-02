import crypto from 'crypto'

const encryptionKey = process.env.ENCRYPTION_KEY

if (!encryptionKey) {
  throw new Error('ENCRYPTION_KEY is not set in the environment variables')
}

// Ensure the key is 32 bytes long
if (encryptionKey.length !== 64) {
  throw new Error('ENCRYPTION_KEY must be a 32-byte (64-character hex) string')
}

const algorithm = 'aes-256-cbc'
const key = Buffer.from(encryptionKey, 'hex')

export function encryptApiKey(apiKey: string) {
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(apiKey, 'utf8', 'hex')
  encrypted += cipher.final('hex')
  return { iv: iv.toString('hex'), encryptedData: encrypted }
}

export function decryptApiKey(iv: string, encryptedData: string) {
  const decipher = crypto.createDecipheriv(
    algorithm,
    key,
    Buffer.from(iv, 'hex'),
  )
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}
