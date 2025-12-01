import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const _supabaseUrl = process.env.SUPABASE_URL;
const _supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(_supabaseUrl, _supabaseKey);

export default supabase;