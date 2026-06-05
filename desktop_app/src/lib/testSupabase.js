import { supabase } from "@/lib/supabaseClient";

export async function testSupabaseConnection() {
  const { data, error } = await supabase.from("projects").select("*").limit(1);

  if (error) {
    console.error("❌ Supabase error:", error.message);
    return false;
  }

  console.log("✅ Supabase connected:", data);
  return true;
}
