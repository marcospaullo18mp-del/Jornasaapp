import { supabase } from '../supabaseClient';

export async function loadFontes(userId) {
  const { data, error } = await supabase
    .from('fontes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function criarFonte(userId, payload) {
  const { data, error } = await supabase
    .from('fontes')
    .insert([{ user_id: userId, ...payload }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function atualizarFonte(id, userId, payload) {
  const { data, error } = await supabase
    .from('fontes')
    .update(payload)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletarFonte(id, userId) {
  const { error } = await supabase
    .from('fontes')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  if (error) throw error;
}
