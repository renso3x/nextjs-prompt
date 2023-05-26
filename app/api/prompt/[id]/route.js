import Prompt from "../../../../models/prompt";
import { connectToDB } from "../../../../utils/database";

// GET
export const GET = async (req, { params }) => {
  try {
    await connectToDB(); // call everytime api - acts like a lambda
    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`);
    return new Response("Failed to fetch prompt", { status: 500 });
  }
};

// PATCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted succesfully", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete Prompt", { status: 500 });
  }
};
