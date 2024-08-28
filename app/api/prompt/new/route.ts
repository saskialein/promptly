import { connectToDB } from "@app/lib/db";
import Prompt from "@models/prompt";

export const POST = async (req: Request) => {
  const { userId, prompt, tag } = await req.json();

  try {
    //we have to connect to the DB every time, because is a lambda function and is going to die every time it has done it's job
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
