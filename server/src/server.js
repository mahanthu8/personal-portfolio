import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
import projectRoutes from './routes/projects.js'
import contactRoutes from './routes/contact.js'

const app = express()
const PORT = process.env.PORT || 5000

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portfolio_db',
  port: Number(process.env.DB_PORT || 3306),

  ssl: {
    rejectUnauthorized: false,
  },

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', async (_req, res) => {
  try {
    await db.query('SELECT 1')
    res.json({ status: 'ok', database: 'mysql', service: 'portfolio-api' })
  } catch {
    res.status(500).json({ status: 'error', database: 'mysql' })
  }
})

app.use('/api/projects', projectRoutes)
app.use('/api/contact', contactRoutes)

export default app
