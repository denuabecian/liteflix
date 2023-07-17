import { supabase } from "../../lib/supabase"

export default async () => {
  const { data } = await supabase.from("films").select("*")
  return data
}
