import express from 'express'
import * as voteService from '../services/voteService'
import { cleanError } from '../utils/common'
import {
  validateAddVoteParams,
  validateVoteCountParams,
  valideRegisterVoteParams
} from '../utils/vote'

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

router.post('/register', (req, res) => {
  try {
    const voterFormValidation = valideRegisterVoteParams(req.body)
    voteService
      .registerVoter(voterFormValidation.id, voterFormValidation.voter_key)
      .then((data) => {
        res.status(200).json({
          status: 'success',
          message: 'Voter registered',
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

router.post('/add', (req, res) => {
  try {
    const addVoteFormValidation = validateAddVoteParams(req.body)
    voteService
      .addVote(addVoteFormValidation)
      .then((data) => {
        res.status(200).json({
          status: 'success',
          message: 'Voter registered',
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

router.get('/representative-federal', (_req, res) => {
  try {
    voteService
      .obtainFederalRepresentatives()
      .then((data) => {
        res.status(200).json({
          status: 'success',
          message: 'Federal representatives obtained',
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

router.get('/representative-local', (_req, res) => {
  try {
    voteService
      .obtainLocalRepresentatives()
      .then((data) => {
        res.status(200).json({
          status: 'success',
          message: 'Local representatives obtained',
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

router.get('/representative-gov', (_req, res) => {
  try {
    voteService
      .obtainGovRepresentatives()
      .then((data) => {
        res.status(200).json({
          status: 'success',
          message: 'Gov representatives obtained',
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

router.get('/urn-status', (req, res) => {
  try {
    const voteFormValidation = validateVoteCountParams(req.query)
    voteService
      .obtainUrnStatus(voteFormValidation)
      .then((data) => {
        res.status(200).json({
          status: 'success',
          message: 'Urn status obtained',
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

router.get('/urn-results-1', (req, res) => {
  try {
    const voteFormValidation = validateVoteCountParams(req.query)
    voteService
      .obtainUrnResults1(voteFormValidation)
      .then((data) => {
        res.status(200).json({
          status: 'success',
          message: 'Urn results obtained',
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

router.get('/urn-results-2', (req, res) => {
  try {
    const voteFormValidation = validateVoteCountParams(req.query)
    voteService
      .obtainUrnResults2(voteFormValidation)
      .then((data) => {
        res.status(200).json({
          status: 'success',
          message: 'Urn results obtained',
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

router.get('/urn-results-3', (req, res) => {
  try {
    const voteFormValidation = validateVoteCountParams(req.query)
    voteService
      .obtainUrnResults3(voteFormValidation)
      .then((data) => {
        res.status(200).json({
          status: 'success',
          message: 'Urn results obtained',
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
