/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
      const extractCounts = query.rows.map((row) => row.count)
      const sum = extractCounts.reduce((a, b) => Number(a) + Number(b), 0)
      return sum
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

export const obtainGovRepresentatives = async (): Promise<Representative[]> => {
  try {
    const query = await pool.query(
      'SELECT * FROM REPRESENTATIVES_GOVERNORSHIP',
      []
    )
    return query.rows as Representative[]
  } catch (err: unknown) {
    throw new Error(`${err as string}`)
  }
}

export const obtainUrnStatus = async (
  id: string
): Promise<{
  isOpen: boolean
}> => {
  try {
    const query = await pool.query('SELECT * FROM USERS WHERE ID = $1', [id])
    if (query.rows.length > 0) {
      const urn = query.rows[0].urn_is_open as boolean
      return { isOpen: urn }
    }
    return { isOpen: false }
  } catch (err: unknown) {
    throw new Error(`${err as string}`)
  }
}

export const obtainUrnResults1 = async (id: string): Promise<Count[]> => {
  const REPRESENTATIVE_FEDERAL = 'diputadosfederales'
  const NULL_VOTE = 'R/N'

  const OTHER_VOTE = 'R/O'
  try {
    const voters = await pool.query(
      'SELECT * FROM COUNT WHERE USER_ASSOCIATED = $1',
      [id]
    )
    if (voters.rows.length > 0) {
      const voterRepresentativeId = voters.rows.map(
        (row) => row.representative_id
      )
      const voterRepresentativeType = voters.rows.map(
        (row) => row.representative_type
      )
      const results = []
      for (let i = 0; i < voterRepresentativeId.length; i++) {
        const representativeId = voterRepresentativeId[i]
        const representativeType = voterRepresentativeType[i]

        const isNullVote = representativeId === NULL_VOTE
        const isOtherVote = representativeId === OTHER_VOTE
        const isFederal = representativeType.includes(REPRESENTATIVE_FEDERAL)

        if (isFederal && !isNullVote && !isOtherVote) {
          const query = await pool.query(
            'SELECT * FROM REPRESENTATIVES_FEDERAL WHERE ID = $1',
            [representativeId]
          )
          const result = query.rows[0] as Count
          results.push(result)

          if (isNullVote || isOtherVote) {
            const nullVote = {
              id: NULL_VOTE,
              name: 'Nulo',
              owner: 'Nulo',
              substitute: 'Nulo',
              image: 'Nulo'
            } as any
            const otherVote = {
              id: OTHER_VOTE,
              name: 'Otro',
              owner: 'Otro',
              substitute: 'Otro',
              image: 'Otro'
            } as any

            results.push(isNullVote ? nullVote : otherVote)
          }
        }
      }
      return results
    }

    throw new Error('No voters found')
  } catch (err: unknown) {
    throw new Error(`${err as string}`)
  }
}

export const obtainUrnResults2 = async (id: string): Promise<Count[]> => {
  const REPRESENTATIVE_LOCAL = 'diputadoslocales'
  const NULL_VOTE = 'R/N'

  const OTHER_VOTE = 'R/O'
  try {
    const voters = await pool.query(
      'SELECT * FROM COUNT WHERE USER_ASSOCIATED = $1',
      [id]
    )
    if (voters.rows.length > 0) {
      const voterRepresentativeId = voters.rows.map(
        (row) => row.representative_id
      )
      const voterRepresentativeType = voters.rows.map(
        (row) => row.representative_type
      )
      const results = []
      for (let i = 0; i < voterRepresentativeId.length; i++) {
        const representativeId = voterRepresentativeId[i]
        const representativeType = voterRepresentativeType[i]

        const isNullVote = representativeId === NULL_VOTE
        const isOtherVote = representativeId === OTHER_VOTE
        const isLocal = representativeType.includes(REPRESENTATIVE_LOCAL)

        console.log(isLocal)

        if (isLocal && !isNullVote && !isOtherVote) {
          const query = await pool.query(
            'SELECT * FROM REPRESENTATIVES_LOCAL WHERE ID = $1',
            [representativeId]
          )
          const result = query.rows[0] as Count
          results.push(result)

          if (isNullVote || isOtherVote) {
            const nullVote = {
              id: NULL_VOTE,
              name: 'Nulo',
              owner: 'Nulo',
              substitute: 'Nulo',
              image: 'Nulo'
            } as any
            const otherVote = {
              id: OTHER_VOTE,
              name: 'Otro',
              owner: 'Otro',
              substitute: 'Otro',
              image: 'Otro'
            } as any

            results.push(isNullVote ? nullVote : otherVote)
          }
        }
      }
      return results
    }

    throw new Error('No voters found')
  } catch (err: unknown) {
    throw new Error(`${err as string}`)
  }
}

export const obtainUrnResults3 = async (id: string): Promise<Count[]> => {
  const REPRESENTATIVE_LOCAL = 'gubernatura'
  const NULL_VOTE = 'R/N'

  const OTHER_VOTE = 'R/O'
  try {
    const voters = await pool.query(
      'SELECT * FROM COUNT WHERE USER_ASSOCIATED = $1',
      [id]
    )
    if (voters.rows.length > 0) {
      const voterRepresentativeId = voters.rows.map(
        (row) => row.representative_id
      )
      const voterRepresentativeType = voters.rows.map(
        (row) => row.representative_type
      )
      const results = []
      for (let i = 0; i < voterRepresentativeId.length; i++) {
        const representativeId = voterRepresentativeId[i]
        const representativeType = voterRepresentativeType[i]

        const isNullVote = representativeId === NULL_VOTE
        const isOtherVote = representativeId === OTHER_VOTE
        const isLocal = representativeType.includes(REPRESENTATIVE_LOCAL)

        console.log(isLocal)

        if (isLocal && !isNullVote && !isOtherVote) {
          const query = await pool.query(
            'SELECT * FROM REPRESENTATIVES_GOVERNORSHIP WHERE ID = $1',
            [representativeId]
          )
          const result = query.rows[0] as Count
          results.push(result)

          if (isNullVote || isOtherVote) {
            const nullVote = {
              id: NULL_VOTE,
              name: 'Nulo',
              owner: 'Nulo',
              substitute: 'Nulo',
              image: 'Nulo'
            } as any
            const otherVote = {
              id: OTHER_VOTE,
              name: 'Otro',
              owner: 'Otro',
              substitute: 'Otro',
              image: 'Otro'
            } as any

            results.push(isNullVote ? nullVote : otherVote)
          }
        }
      }
      return results
    }

    throw new Error('No voters found')
  } catch (err: unknown) {
    throw new Error(`${err as string}`)
  }
}
