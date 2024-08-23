import { connectToDB } from "@utils/database";
import User from "@models/user";
import Prompt from "@models/prompt";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@app/api/auth/[...nextauth]/route";

export const DELETE = async () => {
    const session = await getServerSession(authOptions);
      console.log(session?.user);

  if (!session) return new Response("Unauthorized", { status: 401 });

  try {
    await connectToDB();
    await Prompt.deleteMany({ creator: session.user.id });
    await User.findByIdAndDelete(session.user.id);
    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete user", { status: 500 });
  }
};
