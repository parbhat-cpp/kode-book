import type { User } from '@supabase/supabase-js';
import { atomWithStorage } from 'jotai/utils'

export const userAtom = atomWithStorage<User | null>('user', null);
