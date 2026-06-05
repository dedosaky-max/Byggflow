import { createClient } from "@supabase/supabase-js";

// ⚠️ IMPORTANTISSIMO:
// Queste variabili devono essere lette da Vite, NON da Electron.
// Vite le espone come import.meta.env.VITE_*

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
