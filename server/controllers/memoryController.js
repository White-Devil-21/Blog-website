import Memories from "../models/MemoryModel.js"
import mongoose from "mongoose"

const getMemories = async (req, res) =>{
    const user_id = req.user
    const memories = await Memories.find({user_id}).sort({createdAt: -1})
    res.status(200).json(memories)
}

const getMemory = async (req, res) =>{
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Memory"})
    }

    const memory = await Memories.findById(id)
    
    if(!memory){
       return res.status(400).json({error: "No such memory"})
    }

    res.status(200).json(memory)
}

const createMemory = async(req, res) =>{
    const {date, title, content } = req.body
    
    try {
        const user_id = req.user
        const memory = await Memories.create({date, title, content, user_id})
        res.status(200).json(memory)
    }
    catch (error) {
        res.status(400).json({error: error.message})       
    }
}

const deleteMemory = async (req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Memory"})
    }

    const memory = await Memories.findOneAndDelete({_id: id})

    if(!memory){
        return res.status(400).json({error: "No such memory"})
    }

    res.status(200).json(memory)

}

const upadteMemory = async (req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such Memory"})
    }

    const memory = await Memories.findOneAndUpdate({_id: id}, { ...req.body })

    if(!memory){
        return res.status(400).json({error: "No such memory"})
    }

    res.status(200).json(memory)
}

export { getMemories, getMemory, createMemory, deleteMemory, upadteMemory}