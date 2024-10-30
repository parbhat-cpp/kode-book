import type { Session, User } from '@supabase/supabase-js';
import { atomWithStorage } from 'jotai/utils'

export const userAtom = atomWithStorage<User | null>('user', null);
export const sessionAtom = atomWithStorage<Session | null>('session', null);
