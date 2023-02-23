import express from 'express'
import cors from 'cors'

import diaryRouter from './routes/diaries'

const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3009

app.get('/ping', (_, res) => {
  console.log('ping')
  res.send('pong')
})

app.use('/api/diaries', diaryRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
