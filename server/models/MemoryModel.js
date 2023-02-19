import mongoose from "mongoose"

const Schema = mongoose.Schema

const memoryBase = new Schema({
    date: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }

}, { timestamps: true })

const Memories = mongoose.model("Memories", memoryBase)

export default Memories