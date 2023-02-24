import { UserValidation } from '../auth.types'
import { isString } from './common'

const parseUsername = (username: any): string => {
  if (!isString(username)) {
    throw new Error('Incorrect or missing username')
  }
  return username
}

const parsePassword = (password: any): string => {
  if (!isString(password)) {
    throw new Error('Incorrect or missing password')
  }
  return password
}

const validateUserParams = (object: any): UserValidation => {
  const newUser: UserValidation = {
    name: parseUsername(object.username),
    password: parsePassword(object.password)
  }
  return newUser
}

export default validateUserParams
