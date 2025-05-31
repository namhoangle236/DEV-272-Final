import { createClient } from '@supabase/supabase-js';

const supabaseUrl  = '>>> Lou, past your stuff here <<<';
const supabaseKey  = '>>> Lou, past your stuff here <<<';
export const supabase = createClient(supabaseUrl, supabaseKey);