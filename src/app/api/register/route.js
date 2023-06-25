import connectToDB from "@/lib/mongoDB/connectToDb"
import bcrypt from 'bcrypt'
import User from '@/models/User'

export async function POST(req){
    try {
        await connectToDB.connect()

        const {userName, email, password: pass} = await req.json()
        const isExisting = await User.findOne({email})

        if(isExisting){
            throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(pass, 10)
        const newUser = await User.create({userName, email, password: hashedPassword})
        const {password, ...user} = newUser._doc

        return new Response(JSON.stringify(user), {status: 201})
        
    } catch (error) {
        return new Response(JSON.stringify(error.message), {status: 500})
    }
}