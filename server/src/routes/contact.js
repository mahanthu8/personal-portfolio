import express from 'express'
import { db } from '../server.js'
import nodemailer from 'nodemailer'

const router = express.Router()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({
        message: 'Name, email and message are required'
      })
    }

    // Save message to MySQL
    const [result] = await db.query(
      'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
      [name, email, message]
    )

    // Send email to your Gmail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      text: `
You received a new message from your portfolio.

Name: ${name}
Email: ${email}

Message:
${message}
      `
    })

    res.status(201).json({
      message: 'Message received and email sent successfully',
      id: result.insertId
    })

  } catch (error) {
    console.error('Contact form error:', error)

    res.status(500).json({
      message: 'Message could not be sent',
      error: error.message
    })
  }
})

export default router