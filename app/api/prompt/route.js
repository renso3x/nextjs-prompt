import Prompt from "../../../models/prompt";
import { connectToDB } from "../../../utils/database";

export const GET = async (req, res) => {
  try {
    await connectToDB(); // call everytime api - acts like a lambda
    const prompts = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`);
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};
