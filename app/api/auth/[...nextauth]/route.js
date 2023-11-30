import User from "@/models/user";
import { connectDB } from "@/utils/Connection";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.SECRET
        })
    ],

    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({
                email: session.user.email,
            })

            session.user.id = sessionUser._id.toString();

            return session
        },
        async signIn({ profile }) {
            try {
                // serverless funtion --> lambda function
                await connectDB();

                // check if user is existed
                const userExist = await User.findOne({
                    email: profile.email
                });

                if (!userExist) {
                    await User.create({
                        email: profile.email,
                        name: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }
                return true;

            } catch (error) {
                console.log("Signin error --->", error)
            }
        }
    }

})

export { handler as GET, handler as POST };