import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface TypingResult {
  id: string;
  user_name: string;
  language: 'bangla' | 'english';
  duration_seconds: number;
  wpm: number;
  cpm: number;
  accuracy: number;
  error_count: number;
  created_at: string;
}

export async function saveTypingResult(result: Omit<TypingResult, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('typing_results')
    .insert(result)
    .select()
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function fetchLeaderboard(language: 'bangla' | 'english', limit = 10) {
  const { data, error } = await supabase
    .from('typing_results')
    .select('*')
    .eq('language', language)
    .order('wpm', { ascending: false })
    .order('accuracy', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as TypingResult[];
}

export interface NewsPost {
  id: string;
  title_bn: string;
  title_en: string;
  body_bn: string;
  body_en: string;
  tag_bn: string;
  tag_en: string;
  published_at: string;
}

export async function fetchNews(limit = 3) {
  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .order('published_at', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as NewsPost[];
}

export async function sendContactMessage(message: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const { error } = await supabase.from('contact_messages').insert(message);
  if (error) throw error;
}
