import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

const isSupabaseConfigured = supabaseUrl && 
                           supabaseAnonKey && 
                           supabaseUrl !== 'https://votre-projet.supabase.co' && 
                           supabaseAnonKey !== 'votre_cle_anon_key_ici';

if (!isSupabaseConfigured) {
    console.error('⚠️ Supabase credentials non configurées! Vérifiez votre fichier .env');
    console.error('L\'application fonctionnera en mode dégradé sans connexion Supabase.');
}

export const supabase = isSupabaseConfigured 
    ? createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        },
        global: {
            headers: {
                'X-Client-Info': 'matlou7ch-app'
            }
        },
        db: {
            schema: 'public'
        }
    })
    : null;
