//* GET UPDATE(PATCH) DELETE ---> Prompt
import Prompt from "@/models/prompt";
import { connectDB } from "@/utils/Connection";

//! --> GET 
export const GET = async (request, { params }) => {
    try {   
        await connectDB();

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) return new Response(JSON.stringify({ message: `Prompt Not Found`, success: false }), { status: 404 })

        return new Response(JSON.stringify({ message: prompt, success: true }), { status: 201 })
    } catch (error) {
        console.log('GEt Prompt error --> ', error)
        return new Response(JSON.stringify({ error: error, success: false }), { status: 500 })
    }
}

//! --> PATCH Update Prompt
export const PATCH = async (request, { params }) => {
    const { prompt, tag } = await request.json();
    try {
        await connectDB();

        const exist = await Prompt.findById(params.id);

        if (!exist) return new Response(JSON.stringify({ message: `Prompt Not Found`, success: false }), { status: 404 })

        exist.prompt = prompt
        exist.tag = tag
        await exist.save();

        return new Response(JSON.stringify({ message: exist, success: true }), { status: 201 })

    } catch (error) {
        console.log('Update Prompt Error -->', error)
        return new Response(JSON.stringify({ message: error, success: false }), { status: 500 })
    }
}

//! --> Delete Prompt

export const DELETE = async (request, { params }) => {
    try {
        await connectDB();

        await Prompt.findByIdAndDelete(params.id);

        return new Response(JSON.stringify({ message: 'Prompt Delted Successfully', success: true }), { status: 201 })
    } catch (error) {
        console.log('Delete Prompt --->', error)
        return new Response(JSON.stringify({ message: 'Sorry ! Please try again', success: false }), { status: 500 })
    }
}