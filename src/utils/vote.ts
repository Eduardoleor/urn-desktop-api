import { AddVote, VoterValidation } from '../voter.types'
import { isString } from './common'

const validateVoteCountParams = (params: any): string => {
  if (!isString(params.id)) {
    throw new Error('Invalid ID')
  }
  return params.id
}

const isValidParam = (param: string, paramName: string): string => {
  if (!isString(param)) {
    throw new Error(`Invalid ${paramName} parameter`)
  }
  return param
}

const valideRegisterVoteParams = (params: any): VoterValidation => {
  const newVoter: VoterValidation = {
    id: isValidParam(params.id, 'ID'),
    voter_key: isValidParam(params.voter_key, 'Voter Key')
  }
  return newVoter
}

const validateAddVoteParams = (params: any): AddVote => {
  const newVote: AddVote = {
    id: isValidParam(params.id, 'ID'),
    voter_id: isValidParam(params.voter_id, 'Voter ID'),
    representative_id: isValidParam(
      params.representative_id,
      'Representative ID'
    ),
    representative_type: isValidParam(
      params.representative_type,
      'Representative Type'
    )
  }
  return newVote
}

export {
  validateVoteCountParams,
  valideRegisterVoteParams,
  validateAddVoteParams
}
