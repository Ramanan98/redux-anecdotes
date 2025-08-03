const express = require('express')
const fs = require('fs')
const app = express()

app.use(express.json())

app.get('/api/anecdotes', (req, res) => {
  fs.readFile('db.json', (err, data) => {
    if (err) return res.status(500).end()
    res.json(JSON.parse(data).anecdotes)
  })
})

app.post('/api/anecdotes', (req, res) => {
  fs.readFile('db.json', (err, data) => {
    if (err) return res.status(500).end()
    const db = JSON.parse(data)
    const id = Math.random().toString(36).slice(2, 8)
    const newAnecdote = { id, content: req.body.content, votes: 0 }
    db.anecdotes.push(newAnecdote)
    fs.writeFile('db.json', JSON.stringify(db, null, 2), err2 => {
      if (err2) return res.status(500).end()
      res.status(201).json(newAnecdote)
    })
  })
})

app.post('/api/anecdotes/vote', (req, res) => {
  fs.readFile('db.json', (err, data) => {
    if (err) return res.status(500).end()
    const db = JSON.parse(data)
    const anecdote = db.anecdotes.find(a => a.id === req.body.id)
    if (!anecdote) return res.status(404).end()
    anecdote.votes++
    fs.writeFile('db.json', JSON.stringify(db, null, 2), err2 => {
      if (err2) return res.status(500).end()
      res.json(anecdote)
    })
  })
})

app.get('/version', (req, res) => {
  res.send('0.0.1') // change this string to ensure a new version deployed
})

app.get('/health', (req, res) => {
  res.send('ok')
})

app.use(express.static('dist'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

// test