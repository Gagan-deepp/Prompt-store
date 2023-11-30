import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/Connection";

export const POST = async (req) =>{
    const { userId , prompt , tag } = await req.json();

    try {
        await connectDB();
        const newPrompt = new Prompt({
            creator : userId,
            prompt,
            tag,
        })

        await newPrompt.save();

        return new Response(JSON.stringify({prompt : newPrompt , success: true}), { status: 201 })
    } catch (error) {
        console.log('Prompt send Error : ',error)
        return new Response(JSON.stringify({success: false , mesage : error.mesage}), { status: 500 })
    }
}