-- Trigger pour créer automatiquement un profil public quand un utilisateur s'inscrit via Supabase Auth
-- À exécuter dans l'éditeur SQL de Supabase

-- 1. Créer la fonction trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar, avatar_color, status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'avatar', SUBSTRING(NEW.email, 1, 1)),
    '#4A56E2', -- Couleur par défaut
    'active'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Attacher le trigger à la table auth.users
-- Note: on drop d'abord pour éviter les doublons si on ré-exécute
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Vérification
SELECT 'Trigger créé avec succès' as result;
