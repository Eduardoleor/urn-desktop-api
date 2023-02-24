import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'

import authRouter from './routes/auth'
import voteRouter from './routes/vote'

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

const PORT = 3009

app.get('/ping', (_, res) => {
  console.log('ping')
  res.send('pong')
})

app.use('/api/auth', authRouter)
app.use('/api/vote', voteRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
