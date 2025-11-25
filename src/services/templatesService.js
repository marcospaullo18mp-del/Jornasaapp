import { supabase } from '../supabaseClient';

export async function loadTemplates(userId) {
  const { data, error } = await supabase
    .from('templates')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function criarTemplate(userId, payload) {
  const { data, error } = await supabase
    .from('templates')
    .insert([{ user_id: userId, ...payload }])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function atualizarTemplate(id, userId, payload) {
  const { data, error } = await supabase
    .from('templates')
    .update(payload)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletarTemplate(id, userId) {
  const { error } = await supabase
    .from('templates')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);
  if (error) throw error;
}
