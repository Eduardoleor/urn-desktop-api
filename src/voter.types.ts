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
