export type Role = 'admin' | 'president'

export interface User {
  id: string
  name: string
  password: string
  role: Role
  urn_associated: string
  active: boolean
}

export type UserWithoutPassword = Omit<User, 'password'>

export type UserValidation = Omit<User, 'id' | 'role' | 'urn_associated' | 'active'>
