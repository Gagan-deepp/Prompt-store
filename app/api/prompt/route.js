import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/Connection";

export const GET = async ( request ) =>{
    try {
        await connectDB();
        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify({prompts : prompts , success: true}), {status : 201})
    } catch (error) {
        console.log('GEt Prompt error --> ', error)
        return new Response(JSON.stringify({error : error, success: false}), {status : 201})
    }
}