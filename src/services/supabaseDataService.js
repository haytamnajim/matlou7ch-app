import { supabase } from '../config/supabaseClient';
import { retry, isRetryableError } from '../utils/retry';
import { createLogger } from '../utils/logger';

const logger = createLogger('SupabaseDataService');

// ==================== UTILISATEURS ====================
export const userService = {
    getAll: async () => {
        return retry(async () => {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                logger.error('Erreur lors de la récupération des utilisateurs', error);
                throw error;
            }
            return data;
        }, { shouldRetry: isRetryableError });
    },

    getPaginated: async (page = 1, perPage = 10) => {
        const from = (page - 1) * perPage;
        const to = from + perPage - 1;

        const { data, error, count } = await supabase
            .from('users')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            console.error('Erreur lors de la récupération paginée des utilisateurs:', error);
            throw error;
        }

        return {
            data,
            count,
            totalPages: Math.ceil(count / perPage),
            currentPage: page
        };
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    create: async (userData) => {
        const { data, error } = await supabase
            .from('users')
            .insert([userData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id, userData) => {
        const { data, error } = await supabase
            .from('users')
            .update(userData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id) => {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    getStats: async () => {
        const { data, error } = await supabase
            .from('users')
            .select('id, status, created_at');
        if (error) throw error;

        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const newUsersThisWeek = data.filter(u =>
            new Date(u.created_at) > weekAgo
        ).length;

        return {
            total: data.length,
            active: data.filter(u => u.status === 'active').length,
            newThisWeek: newUsersThisWeek,
        };
    },
};

// ==================== ANNONCES ====================
export const listingService = {
    getAll: async () => {
        return retry(async () => {
            const { data, error } = await supabase
                .from('listings_with_user')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                console.error('Erreur lors de la récupération des annonces:', error);
                throw error;
            }
            return data;
        }, { shouldRetry: isRetryableError });
    },

    getPaginated: async (page = 1, perPage = 12) => {
        const from = (page - 1) * perPage;
        const to = from + perPage - 1;

        const { data, error, count } = await supabase
            .from('listings_with_user')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(from, to);

        if (error) {
            console.error('Erreur lors de la récupération paginée des annonces:', error);
            throw error;
        }

        return {
            data,
            count,
            totalPages: Math.ceil(count / perPage),
            currentPage: page
        };
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from('listings_with_user')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    create: async (listingData) => {
        const { data, error } = await supabase
            .from('listings')
            .insert([listingData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id, listingData) => {
        const { data, error } = await supabase
            .from('listings')
            .update(listingData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id) => {
        const { error } = await supabase
            .from('listings')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    getStats: async () => {
        const { data, error } = await supabase
            .from('listings')
            .select('id, is_published, created_at');
        if (error) throw error;

        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

        const newListingsThisWeek = data.filter(l =>
            new Date(l.created_at) > weekAgo
        ).length;

        return {
            total: data.length,
            active: data.filter(l => l.is_published).length,
            newThisWeek: newListingsThisWeek,
        };
    },

    getByCategory: async () => {
        const { data, error } = await supabase.from('listings').select('category');
        if (error) throw error;

        const categoryCount = {};
        data.forEach(l => {
            categoryCount[l.category] = (categoryCount[l.category] || 0) + 1;
        });
        return categoryCount;
    },

    getByCity: async () => {
        const { data, error } = await supabase.from('listings').select('location');
        if (error) throw error;

        const cityCount = {};
        data.forEach(l => {
            cityCount[l.location] = (cityCount[l.location] || 0) + 1;
        });
        return cityCount;
    },

    getByUserId: async (userId) => {
        const { data, error } = await supabase
            .from('listings_with_user')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return data;
    },

    search: async (filters = {}) => {
        const { category, location, query } = filters;
        
        let queryBuilder = supabase
            .from('listings_with_user')
            .select('*')
            .eq('is_published', true)
            .order('created_at', { ascending: false });

        if (category && category !== '') {
            queryBuilder = queryBuilder.eq('category', category);
        }

        if (location && location !== '') {
            queryBuilder = queryBuilder.ilike('location', `%${location}%`);
        }

        if (query && query !== '') {
            queryBuilder = queryBuilder.ilike('title', `%${query}%`);
        }

        const { data, error } = await queryBuilder;

        if (error) {
            logger.error('Erreur lors de la recherche', error);
            throw error;
        }
        return data;
    },
};

// ==================== SIGNALEMENTS ====================
export const reportService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('reports')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            logger.error('Erreur lors de la récupération des signalements', error);
            throw error;
        }
        return data;
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from('reports')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return data;
    },

    create: async (reportData) => {
        const { data, error } = await supabase
            .from('reports')
            .insert([reportData])
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    update: async (id, reportData) => {
        const { data, error } = await supabase
            .from('reports')
            .update(reportData)
            .eq('id', id)
            .select()
            .single();

        if (error) throw error;
        return data;
    },

    delete: async (id) => {
        const { error } = await supabase
            .from('reports')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return true;
    },

    getStats: async () => {
        const { data, error } = await supabase
            .from('reports')
            .select('id, status');
        if (error) throw error;

        return {
            total: data.length,
            pending: data.filter(r => r.status === 'pending').length,
            resolved: data.filter(r => r.status === 'resolved').length,
        };
    },
};

// ==================== MESSAGES ====================
export const messageService = {
    getByUserId: async (userId) => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
            .order('created_at', { ascending: false });

        if (error) {
            logger.error('Erreur lors de la récupération des messages', error);
            throw error;
        }
        return data;
    },

    getConversation: async (userId1, userId2) => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .or(`and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`)
            .order('created_at', { ascending: true });

        if (error) {
            logger.error('Erreur lors de la récupération de la conversation', error);
            throw error;
        }
        return data;
    },

    create: async (messageData) => {
        const { data, error } = await supabase
            .from('messages')
            .insert([messageData])
            .select()
            .single();

        if (error) {
            logger.error('Erreur lors de la création du message', error);
            throw error;
        }
        return data;
    },

    update: async (id, messageData) => {
        const { data, error } = await supabase
            .from('messages')
            .update(messageData)
            .eq('id', id)
            .select()
            .single();

        if (error) {
            logger.error('Erreur lors de la mise à jour du message', error);
            throw error;
        }
        return data;
    },

    delete: async (id) => {
        const { error } = await supabase
            .from('messages')
            .delete()
            .eq('id', id);

        if (error) {
            logger.error('Erreur lors de la suppression du message', error);
            throw error;
        }
        return true;
    },

    markAsRead: async (id) => {
        const { data, error } = await supabase
            .from('messages')
            .update({ is_read: true })
            .eq('id', id)
            .select()
            .single();

        if (error) {
            logger.error('Erreur lors du marquage comme lu', error);
            throw error;
        }
        return data;
    },
};

// ==================== FAVORIS ====================
export const favoriteService = {
    getByUserId: async (userId) => {
        const { data, error } = await supabase
            .from('favorites')
            .select('*, listings(*)')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (error) {
            logger.error('Erreur lors de la récupération des favoris', error);
            throw error;
        }
        return data;
    },

    create: async (favoriteData) => {
        const { data, error } = await supabase
            .from('favorites')
            .insert([favoriteData])
            .select()
            .single();

        if (error) {
            logger.error('Erreur lors de la création du favori', error);
            throw error;
        }
        return data;
    },

    delete: async (userId, listingId) => {
        const { error } = await supabase
            .from('favorites')
            .delete()
            .eq('user_id', userId)
            .eq('listing_id', listingId);

        if (error) {
            logger.error('Erreur lors de la suppression du favori', error);
            throw error;
        }
        return true;
    },

    isFavorite: async (userId, listingId) => {
        const { data, error } = await supabase
            .from('favorites')
            .select('id')
            .eq('user_id', userId)
            .eq('listing_id', listingId)
            .single();

        if (error && error.code !== 'PGRST116') {
            logger.error('Erreur lors de la vérification du favori', error);
            throw error;
        }
        return !!data;
    },
};

// ==================== STATS GLOBALES ====================
export const statsService = {
    getGlobalStats: async () => {
        try {
            const userStats = await userService.getStats();
            const listingStats = await listingService.getStats();
            const reportStats = await reportService.getStats();

            return {
                users: userStats.total,
                newUsers: userStats.newThisWeek,
                listings: listingStats.total,
                activeListings: listingStats.active,
                reports: reportStats.pending,
            };
        } catch (error) {
            logger.error('Erreur lors de la récupération des stats globales', error);
            throw error;
        }
    },

    getMonthlyData: async () => {
        try {
            const { data: users, error: usersError } = await supabase
                .from('users')
                .select('created_at')
                .order('created_at', { ascending: true });

            const { data: listings, error: listingsError } = await supabase
                .from('listings')
                .select('created_at')
                .order('created_at', { ascending: true });

            if (listingsError) {
                logger.error('Erreur getMonthlyData', listingsError);
                throw listingsError;
            }

            // Calculer les données mensuelles pour les 7 derniers mois
            const months = [];
            const userCounts = [];
            const listingCounts = [];

            for (let i = 6; i >= 0; i--) {
                const date = new Date();
                date.setMonth(date.getMonth() - i);
                const monthStart = new Date(date.getFullYear(), date.getMonth(), 1);
                const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0);

                const monthName = date.toLocaleDateString('fr-FR', { month: 'long' });
                months.push(monthName.charAt(0).toUpperCase() + monthName.slice(1));

                // Compter les utilisateurs créés ce mois
                const usersInMonth = users.filter(u => {
                    const userDate = new Date(u.created_at);
                    return userDate >= monthStart && userDate <= monthEnd;
                }).length;
                userCounts.push(usersInMonth);

                // Compter les annonces créées ce mois
                const listingsInMonth = listings.filter(l => {
                    const listingDate = new Date(l.created_at);
                    return listingDate >= monthStart && listingDate <= monthEnd;
                }).length;
                listingCounts.push(listingsInMonth);
            }

            return {
                users: userCounts,
                listings: listingCounts,
            };
        } catch (error) {
            logger.error('Erreur lors de la récupération des données mensuelles', error);
            // Retourner des données par défaut en cas d'erreur
            return {
                users: [0, 0, 0, 0, 0, 0, 0],
                listings: [0, 0, 0, 0, 0, 0, 0],
            };
        }
    },
};
