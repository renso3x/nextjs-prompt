import Prompt from "../../../../models/prompt";
import { connectToDB } from "../../../../utils/database";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();

  try {
    await connectToDB(); // call everytime api - acts like a lambda

    const newPrompt = new Prompt({
      creator: userId,
      tag,
      prompt,
    });

    await newPrompt.save();
    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`);
    return new Response("Failed to create a new prompt");
  }
};
