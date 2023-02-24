import express from 'express'
import * as voteService from '../services/voteService'
import { cleanError } from '../utils/common'
import { validateVoteCountParams } from '../utils/vote'

const router = express.Router()

router.get('/count', (req, res) => {
  try {
    const voteFormValidation = validateVoteCountParams(req.query)
    voteService
      .obtainCount(voteFormValidation)
      .then((data) => {
        res.status(200).json({
          status: 'success',
          message: 'Vote count obtained',
          data
        })
      })
      .catch((e) => {
        if (e instanceof Error) {
          res.status(400).json({
            status: 'error',
            message: cleanError(e.message),
            data: null
          })
        }
      })
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({
        status: 'error',
        message: cleanError(e.message),
        data: null
      })
    }
  }
})

export default router
