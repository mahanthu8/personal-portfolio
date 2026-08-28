import express from 'express'
import { db } from '../server.js'

const router = express.Router()

function adminOnly(req, res, next) {
  if (req.headers['x-admin-key'] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
  next()
}

function mapProject(row) {
  return {
    ...row,
    technologies: row.technologies
      ? row.technologies.split(',').map(item => item.trim()).filter(Boolean)
      : [],
    featured: Boolean(row.featured),
  }
}

router.get('/', async (_req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM projects ORDER BY featured DESC, created_at DESC'
    )
    res.json(rows.map(mapProject))
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM projects WHERE id = ?',
      [req.params.id]
    )
    if (!rows.length) return res.status(404).json({ message: 'Project not found' })
    res.json(mapProject(rows[0]))
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.post('/', adminOnly, async (req, res) => {
  try {
    const { title, description, technologies = [], image = '', link = '#', featured = false } = req.body

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description are required' })
    }

    const [result] = await db.query(
      `INSERT INTO projects (title, description, technologies, image, link, featured)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [title, description, technologies.join(', '), image, link, featured ? 1 : 0]
    )

    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [result.insertId])
    res.status(201).json(mapProject(rows[0]))
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.put('/:id', adminOnly, async (req, res) => {
  try {
    const { title, description, technologies = [], image = '', link = '#', featured = false } = req.body

    const [result] = await db.query(
      `UPDATE projects
       SET title = ?, description = ?, technologies = ?, image = ?, link = ?, featured = ?
       WHERE id = ?`,
      [title, description, technologies.join(', '), image, link, featured ? 1 : 0, req.params.id]
    )

    if (!result.affectedRows) return res.status(404).json({ message: 'Project not found' })

    const [rows] = await db.query('SELECT * FROM projects WHERE id = ?', [req.params.id])
    res.json(mapProject(rows[0]))
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const [result] = await db.query(
      'DELETE FROM projects WHERE id = ?',
      [req.params.id]
    )
    if (!result.affectedRows) return res.status(404).json({ message: 'Project not found' })
    res.json({ message: 'Project deleted' })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

export default router
