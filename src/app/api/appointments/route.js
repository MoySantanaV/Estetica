import connectToDB from "@/lib/mongoDB/connectToDb"
import { verifyJwtToken } from '@/lib/jwt'
import Appointment from '@/models/Appointment'

export async function GET(req) {
    await connectToDB.connect()

    try {
        const appointments = await Appointment.find({}).populate("appointmentId")
        return new Response(JSON.stringify(appointments), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function POST(req) {
    await connectToDB.connect()

    const accessToken = req.headers.get("authorization")
    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const body = await req.json()
        const newAppointment = await Appointment.create(body)

        return new Response(JSON.stringify(newAppointment), { status: 201 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}