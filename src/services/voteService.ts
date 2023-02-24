/* eslint-disable @typescript-eslint/naming-convention */
import pool from '../utils/db'
import { AddVote, Count, Representative, Voter } from '../voter.types'

export const obtainCount = async (user: string): Promise<number> => {
  try {
    const query = await pool.query(
      'SELECT * FROM COUNT WHERE USER_ASSOCIATED = $1',
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

export const registerVoter = async (
  id: string,
  voter_key: string
): Promise<Voter | null> => {
  try {
    const voter = await pool.query(
      'SELECT * FROM VOTERS WHERE VOTER_KEY = $1',
      [voter_key]
    )
    if (voter.rows.length > 0) {
      const voterHasVoted = voter.rows[0]?.voted as boolean
      if (voterHasVoted) {
        throw new Error('Voter has already voted')
      } else {
        return voter.rows[0] as Voter
      }
    } else {
      const findAssociatedUser = await pool.query(
        'SELECT * FROM USERS WHERE ID = $1',
        [id]
      )
      if (findAssociatedUser.rows.length > 0) {
        const newVoter = await pool.query(
          'INSERT INTO VOTERS (VOTER_KEY, USER_ASSOCIATED) VALUES ($1, $2) RETURNING *',
          [voter_key, id]
        )
        return newVoter.rows[0] as Voter
      } else {
        throw new Error('User not found')
      }
    }
  } catch (err: unknown) {
    throw new Error(`${err as string}`)
  }
}

export const addVote = async (vote: AddVote): Promise<Count> => {
  try {
    const { id, representative_id, representative_type, voter_id } = vote
    const count = 1
    const query = await pool.query(
      'INSERT INTO COUNT(USER_ASSOCIATED, VOTER_ASSOCIATED, USER_HAS_VOTED, REPRESENTATIVE_ID, REPRESENTATIVE_TYPE, COUNT) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [id, voter_id, true, representative_id, representative_type, count]
    )
    return query.rows[0] as Count
  } catch (err: unknown) {
    throw new Error(`${err as string}`)
  }
}

export const obtainFederalRepresentatives = async (): Promise<
Representative[]
> => {
  try {
    const query = await pool.query('SELECT * FROM REPRESENTATIVES_FEDERAL', [])
    return query.rows as Representative[]
  } catch (err: unknown) {
    throw new Error(`${err as string}`)
  }
}

export const obtainLocalRepresentatives = async (): Promise<
Representative[]
> => {
  try {
    const query = await pool.query('SELECT * FROM REPRESENTATIVES_LOCAL', [])
    return query.rows as Representative[]
  } catch (err: unknown) {
    throw new Error(`${err as string}`)
  }
}
