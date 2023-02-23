import express from 'express'
import * as diaryService from '../services/diaryService'
import toNewDiaryEntry from '../utils/diaries'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryService.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  res.send(diaryService.findById(Number(req.params.id)))
})

router.post('/', (req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(req.body)
    const adddDiaryEntry = diaryService.addDiary(newDiaryEntry)

    res.json(adddDiaryEntry)
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).send(err.message)
    }
  }
})

export default router
