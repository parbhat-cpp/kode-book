import { atomWithStorage } from 'jotai/utils'

export interface KodeBookUser {
    avatar_url: string | null,
    full_name: string,
    id: string,
    updated_at: Date,
    username: string,
    works_at: string | null,
    location: string | null,
    followers: number,
    following: number
}

export const userAtom = atomWithStorage<KodeBookUser | null>('user', null);
