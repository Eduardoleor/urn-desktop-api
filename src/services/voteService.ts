import pool from '../utils/db'

export const obtainCount = async (user: string): Promise<number> => {
  try {
    const query = await pool.query(
      'SELECT * FROM COUNT WHERE user_associated = $1',
      [user]
    )
    if (query.rows.length > 0) {
      return Number(query.rows[0].count)
    } else {
      return 0
    }
  } catch (err: unknown) {
    throw new Error(`${err as string}`)
  }
}
