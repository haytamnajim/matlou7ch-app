import { supabase } from '../config/supabaseClient';

// ==================== UTILISATEURS ====================
export const userService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            throw error;
        }
        return data;
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
        const { data, error } = await supabase.from('users').select('*');
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
        const { data, error } = await supabase
            .from('listings_with_user')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erreur lors de la récupération des annonces:', error);
            throw error;
        }
        return data;
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
        const { data, error } = await supabase.from('listings').select('*');
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
};

// ==================== SIGNALEMENTS ====================
export const reportService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('reports')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Erreur lors de la récupération des signalements:', error);
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
        const { data, error } = await supabase.from('reports').select('*');
        if (error) throw error;

        return {
            total: data.length,
            pending: data.filter(r => r.status === 'pending').length,
            resolved: data.filter(r => r.status === 'resolved').length,
        };
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
            console.error('Erreur lors de la récupération des stats globales:', error);
            throw error;
        }
    },

    getMonthlyData: async () => {
        // Pour l'instant, retourne des données simulées
        // TODO: Implémenter le calcul réel depuis Supabase
        return {
            users: [65, 78, 90, 81, 106, 120, 156],
            listings: [28, 48, 40, 59, 76, 87, 120],
        };
    },
};
