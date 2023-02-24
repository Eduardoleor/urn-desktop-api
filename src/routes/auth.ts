import express from 'express'
import * as authService from '../services/authService'
import validateUserParams from '../utils/auth'

const router = express.Router()

router.get('/validate', (req, res) => {
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
            message: e.message,
            data: null
          })
        }
      })
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).json({
        status: 'error',
        message: e.message,
        data: null
      })
    }
  }
})

export default router
