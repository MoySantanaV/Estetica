import mongoose from 'mongoose'

const AppointmentSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    clientName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    service: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
    },
}, {timestamp: true})

export default mongoose?.models?.Appointment || mongoose.model('Appointment', AppointmentSchema)