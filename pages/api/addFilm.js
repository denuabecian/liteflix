import { supabase } from "../../lib/supabase"
import { v4 as uuidv4 } from 'uuid'

export const addPoster = async (poster) => {
  const posterName = `${uuidv4()}-${poster?.name}`
  await supabase
    .storage
    .from('filmPosters')
    .upload(`/public/${posterName}`, poster, {
      cacheControl: '3600',
      upsert: false,
      contentType: poster?.type,
    })

  const { data } = supabase
    .storage
    .from('filmPosters')
    .getPublicUrl(`public/${posterName}`)
  return data
}

export default async ({ title, poster }) => {
  const data = await addPoster(poster)
  const response = await supabase.from("films").insert({ title, poster_path: data?.publicUrl })
  return response
}