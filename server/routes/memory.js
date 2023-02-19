import express from "express"
import { createMemory, getMemories, getMemory, deleteMemory, upadteMemory } from "../controllers/memoryController.js"
import authChecker from "../middleware/authChecker.js"

const router = express.Router()

router.use(authChecker)

router.get('/', getMemories)

router.get('/:id', getMemory)

router.post('/', createMemory)

router.delete('/:id', deleteMemory)

router.patch('/:id', upadteMemory)

export default router