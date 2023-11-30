import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/Connection";

export const GET = async ( request , { params } ) =>{
    try {
        await connectDB();
        const post = await Prompt.find({creator : params.id}).populate('creator')

        return new Response(JSON.stringify({posts : post , success: true}), {status : 201})
    } catch (error) {
        console.log('GEt Prompt error --> ', error)
        return new Response(JSON.stringify({error : error, success: false}), {status : 201})
    }
}