import express from 'express'
import { db } from '../server.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email and message are required' })
    }

    const [result] = await db.query(
      'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    )

    res.status(201).json({ message: 'Message received', id: result.insertId })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
