import express from 'express'
import cors from 'cors'
import fs from 'fs'

const app = express()
app.use(cors())
app.use(express.json())

const cats = JSON.parse(fs.readFileSync('./cats.json', 'utf-8'))

app.get('/', (req, res) => {
  res.send('Cat Character API is running')
})

app.get('/api/cats', (req, res) => {
  res.json(cats)
})

app.get('/api/cats/:id', (req, res) => {
  const cat = cats.find((d) => d.id === Number(req.params.id))
  if (!cat) return res.status(404).json({ error: 'Cat not found' })
  res.json(cat)
})

app.get('/api/search', (req, res) => {
  const q = req.query.q?.toLowerCase() || ''
  const results = cats.filter((d) => d.name.toLowerCase().includes(q))
  res.json(results)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
