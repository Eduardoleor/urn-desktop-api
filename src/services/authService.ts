import { UserValidation, UserWithoutPassword } from '../auth.types'
import pool from '../utils/db'

export const validateSession = async (
  user: UserValidation
): Promise<UserWithoutPassword | null> => {
  try {
    const { name, password } = user
    const query = await pool.query(
      'SELECT ID, NAME, ROLE, URN_ASSOCIATED, ACTIVE FROM USERS WHERE NAME = $1 and PASSWORD = $2',
      [name, password]
    )
    if (query.rows.length === 0) {
      throw new Error('User not found')
    }
    return query.rows[0] as UserWithoutPassword
  } catch (err: unknown) {
    throw new Error(`${err as string}`)
  }
}
