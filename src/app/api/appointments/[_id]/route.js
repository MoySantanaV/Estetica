import connectToDB from "@/lib/mongoDB/connectToDb"
import { verifyJwtToken } from '@/lib/jwt'
import Appointment from '@/models/Appointment'
import User from '@//Users'

export async function GET(req, ctx){
    await connectToDB.connect()

    const id = ctx.params.id

    try {
        const appointment = await Appointment.findbyId(id).populate('apointmenId').select('password')
        return new Response(JSON.stringify(appointment), {status:200})
    } catch (error) {
        return new Response(JSON.stringify(null), {status:500})
    }

}

export async function PUT(req, ctx) {
    await db.connect()

    const id = ctx.params.id
    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(" ")[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const body = await req.json()
        const appointment = await Appointment.findById(id).populate('apponitmentID')

        if (appointment?.apponitmentID?._id.toString() !== decodedToken._id.toString()) {
            return new Response(JSON.stringify({ msg: 'Only author can update his appointment' }), { status: 403 })
        }

        const updatedAppointment = await Appointment.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })

        return new Response(JSON.stringify(updatedAppointment), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 })
    }
}

export async function DELETE(req, ctx) {
    await db.connect()

    const id = ctx.params.id

    const accessToken = req.headers.get('authorization')
    const token = accessToken.split(' ')[1]

    const decodedToken = verifyJwtToken(token)

    if (!accessToken || !decodedToken) {
        return new Response(JSON.stringify({ error: "unauthorized (wrong or expired token)" }), { status: 403 })
    }

    try {
        const appointment = await Appointment.findById(id).populate('apponitmentID')
        if (appointment?.apponitmentID?._id.toString() !== decodedToken._id.toString()) {
            return new Response(JSON.stringify({ msg: 'Only author can delete his appointment' }), { status: 403 })
        }

        await Appointment.findByIdAndDelete(id)

        return new Response(JSON.stringify({msg: 'Successfully deleted appointment'}), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), { status: 500 }) 
    }
}
