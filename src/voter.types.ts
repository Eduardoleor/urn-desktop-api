export interface Voter {
  id: string
  voter_key: string
  user_associated: string
  start_at: Date
  voted: boolean
}

export type VoterValidation = Omit<
Voter,
'user_associated' | 'user_associated' | 'start_at' | 'voted'
>

export interface Representative {
  id: string
  name: string
  owner: string
  substitute: string
  image: string
}

export interface Count {
  id: string
  user_associated: string
  voter_associated: string
  user_has_voted: boolean
  representative_id: string
  representative_type: string
  count: number
}

export interface AddVote {
  id: string
  voter_id: string
  representative_id: string
  representative_type: string
}
