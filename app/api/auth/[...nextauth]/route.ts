import NextAuth, { AuthOptions, Session } from 'next-auth'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import User from '@models/user'
import { findOrCreateUser } from '@app/lib/auth'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      const sessionUser = await User.findOne({
        email: session.user?.email,
      })

      session.user.id = sessionUser._id.toString()

      return session
    },
    async signIn({ profile }) {
      try {
        return await findOrCreateUser(profile as GoogleProfile)
      } catch (error) {
        console.error('Sign-in error:', error)
        return false
      }
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
