import { connectToDB } from "@utils/database";
import NextAuth, { Account, AuthOptions, Profile, Session } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";
import User from "@models/user";

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
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({
      account,
      profile,
    }: {
      account: Account | null;
      profile?: Profile | null;
    }) {
      try {
        await connectToDB();

        const userExists = await User.findOne({
          email: profile?.email,
        });

        if (!userExists) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLowerCase(),
            image: (profile as GoogleProfile)?.picture,
            apiKeys: []
          });
        }

        if (account?.provider === "google") {
          return (profile as GoogleProfile)?.email_verified;
        }
        return true;
      } catch (error) {
        console.error("Error checking if user exists: ", error);
        return false;
      }
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
