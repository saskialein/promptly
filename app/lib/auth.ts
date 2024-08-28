import User from "@models/user";
import { GoogleProfile } from "next-auth/providers/google";
import { connectToDB } from "./db";

export const findOrCreateUser = async (profile: GoogleProfile) => {
    try {
        await connectToDB();
    
        const userExists = await User.findOne({
          email: profile.email,
        });
    
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name?.replace(" ", "").toLowerCase(),
            image: profile.picture,
            apiKeys: [],
          });
        }
    
        return userExists || profile.email_verified;
      } catch (error) {
        console.error("Error in findOrCreateUser:", error);
        throw new Error("Failed to find or create user");
      }
};