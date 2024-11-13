import { atomWithStorage } from 'jotai/utils'

export interface KodeBookUser {
    avatar_url: string | null,
    full_name: string,
    id: string,
    updated_at: Date,
    username: string,
    website: string | null,
    works_at: string | null,
    location: string | null,
}

export const userAtom = atomWithStorage<KodeBookUser | null>('user', null);
