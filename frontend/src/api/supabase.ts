import { createClient } from "@supabase/supabase-js";

const supabaseUrl1 = import.meta.env.VITE_SUPABASE_URL_1;
const supabaseKey1 = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY_1;

const supabaseUrl2 = import.meta.env.VITE_SUPABASE_URL_2;
const supabaseKey2 = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY_2;

export const supabase1 = createClient(supabaseUrl1, supabaseKey1);
export const supabase2 = createClient(supabaseUrl2, supabaseKey2);
