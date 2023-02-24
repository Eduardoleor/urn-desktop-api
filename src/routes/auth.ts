import express from 'express'
import * as authService from '../services/authService'
import validateUserParams from '../utils/auth'
import { cleanError } from '../utils/common'

const router = express.Router()

router.post('/validate', (req, res) => {
  try {
    const userForValidation = validateUserParams(req.body)
    authService
      .validateSession(userForValidation)
      .then((data) => {
        res.status(200).json({
          status: 'success',
          message: 'User validated',
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
