-- ==========================================
-- SCRIPT SQL COMPLET - MATLOU7CH DATABASE
-- ==========================================
-- À exécuter dans l'éditeur SQL de Supabase

-- ==========================================
-- 1. EXTENSIONS
-- ==========================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ==========================================
-- 2. TABLES
-- ==========================================

-- Table: users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  city TEXT,
  avatar TEXT,
  avatar_color TEXT DEFAULT '#FF5733',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'blocked', 'suspended')),
  listings_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: listings (annonces)
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  condition TEXT,
  status TEXT DEFAULT 'published' CHECK (status IN ('published', 'archived', 'deleted')),
  is_published BOOLEAN DEFAULT true,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: reports (signalements)
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  listing_title TEXT,
  reported_by TEXT NOT NULL,
  reporter_name TEXT,
  reason TEXT NOT NULL CHECK (reason IN ('spam', 'inappropriate', 'scam', 'duplicate', 'other')),
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'resolved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  resolved_at TIMESTAMP WITH TIME ZONE
);

-- Table: favorites (favoris)
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, listing_id)
);

-- Table: messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- 3. INDEX POUR PERFORMANCES
-- ==========================================

CREATE INDEX IF NOT EXISTS idx_listings_user_id ON listings(user_id);
CREATE INDEX IF NOT EXISTS idx_listings_category ON listings(category);
CREATE INDEX IF NOT EXISTS idx_listings_location ON listings(location);
CREATE INDEX IF NOT EXISTS idx_listings_created_at ON listings(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_listing_id ON reports(listing_id);
CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver_id ON messages(receiver_id);

-- ==========================================
-- 4. TRIGGERS POUR updated_at
-- ==========================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==========================================
-- 5. FUNCTION POUR METTRE À JOUR LE COMPTEUR D'ANNONCES
-- ==========================================

CREATE OR REPLACE FUNCTION update_user_listings_count()
RETURNS TRIGGER AS $$
BEGIN
  IF (TG_OP = 'INSERT') THEN
    UPDATE users SET listings_count = listings_count + 1 WHERE id = NEW.user_id;
    RETURN NEW;
  ELSIF (TG_OP = 'DELETE') THEN
    UPDATE users SET listings_count = listings_count - 1 WHERE id = OLD.user_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_listings_count_insert AFTER INSERT ON listings
  FOR EACH ROW EXECUTE FUNCTION update_user_listings_count();

CREATE TRIGGER update_listings_count_delete AFTER DELETE ON listings
  FOR EACH ROW EXECUTE FUNCTION update_user_listings_count();

-- ==========================================
-- 6. ROW LEVEL SECURITY (RLS)
-- ==========================================

-- Activer RLS sur toutes les tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies pour users (tout le monde peut voir, seul l'utilisateur peut modifier)
CREATE POLICY "Users are viewable by everyone" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own data" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Policies pour listings (tout le monde peut voir, propriétaire peut modifier)
CREATE POLICY "Listings are viewable by everyone" ON listings
  FOR SELECT USING (is_published = true OR auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own listings" ON listings
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can update own listings" ON listings
  FOR UPDATE USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own listings" ON listings
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- Policies pour reports (tout le monde peut créer, admins peuvent voir)
CREATE POLICY "Anyone can create reports" ON reports
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Reports viewable by admins" ON reports
  FOR SELECT USING (true); -- À ajuster selon votre logique admin

-- Policies pour favorites
CREATE POLICY "Users can view own favorites" ON favorites
  FOR SELECT USING (auth.uid()::text = user_id::text);

CREATE POLICY "Users can insert own favorites" ON favorites
  FOR INSERT WITH CHECK (auth.uid()::text = user_id::text);

CREATE POLICY "Users can delete own favorites" ON favorites
  FOR DELETE USING (auth.uid()::text = user_id::text);

-- Policies pour messages
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (
    auth.uid()::text = sender_id::text OR 
    auth.uid()::text = receiver_id::text
  );

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid()::text = sender_id::text);

-- ==========================================
-- 7. DONNÉES DE TEST
-- ==========================================

-- Insérer des utilisateurs de test
INSERT INTO users (id, email, name, city, avatar, avatar_color, status, listings_count) VALUES
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'sara.alaoui@gmail.com', 'Sara Alaoui', 'Casablanca', 'S', '#FF5252', 'active', 2),
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'karim.b@gmail.com', 'Karim Benjelloun', 'Rabat', 'K', '#448AFF', 'active', 1),
  ('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13', 'fatima.z@gmail.com', 'Fatima Zahra', 'Marrakech', 'F', '#69F0AE', 'active', 0)
ON CONFLICT (email) DO NOTHING;

-- Insérer des annonces de test
INSERT INTO listings (user_id, title, description, category, location, condition, status, is_published, views) VALUES
  ('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12', 'Canapé en cuir', 'Canapé 3 places en excellent état, couleur marron', 'Meubles', 'Casablanca', 'très bon état', 'published', true, 45),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Vélo de montagne', 'VTT en bon état, idéal pour la ville et les balades', 'Sports', 'Rabat', 'bon état', 'published', true, 32),
  ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Livres de cuisine', 'Collection de livres de recettes marocaines et internationales', 'Livres', 'Casablanca', 'comme neuf', 'published', true, 18)
ON CONFLICT DO NOTHING;

-- Insérer des signalements de test
INSERT INTO reports (listing_id, listing_title, reported_by, reporter_name, reason, description, status) 
SELECT 
  l.id,
  l.title,
  'user123@gmail.com',
  'Ahmed M.',
  'spam',
  'Annonce suspecte, semble être du spam',
  'pending'
FROM listings l WHERE l.title = 'Canapé en cuir'
ON CONFLICT DO NOTHING;

-- ==========================================
-- 8. VUES UTILES (OPTIONNEL)
-- ==========================================

-- Vue: Statistiques globales
CREATE OR REPLACE VIEW global_stats AS
SELECT 
  (SELECT COUNT(*) FROM users WHERE status = 'active') as total_users,
  (SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days') as new_users_week,
  (SELECT COUNT(*) FROM listings WHERE is_published = true) as total_listings,
  (SELECT COUNT(*) FROM listings WHERE is_published = true AND created_at > NOW() - INTERVAL '7 days') as new_listings_week,
  (SELECT COUNT(*) FROM reports WHERE status = 'pending') as pending_reports;

-- Vue: Annonces avec informations utilisateur
CREATE OR REPLACE VIEW listings_with_user AS
SELECT 
  l.*,
  u.name as user_name,
  u.email as user_email,
  u.avatar,
  u.avatar_color
FROM listings l
JOIN users u ON l.user_id = u.id;

-- ==========================================
-- FIN DU SCRIPT
-- ==========================================

-- Vérification
SELECT 'Tables créées avec succès!' as message;
SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename;
