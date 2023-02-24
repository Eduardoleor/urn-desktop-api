import { isString } from './common'

const validateVoteCountParams = (params: any): string => {
  if (!isString(params.id)) {
    throw new Error('Invalid ID')
  }
  return params.id
}
export { validateVoteCountParams }
