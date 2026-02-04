// Service centralisé pour gérer toutes les données de l'application
// Utilise localStorage pour la persistance

// ==================== UTILISATEURS ====================
const USERS_KEY = 'matlou7ch_users';
const INITIAL_USERS = [
    {
        id: 1,
        name: 'Sara Alaoui',
        email: 'sara.alaoui@gmail.com',
        city: 'Casablanca',
        status: 'active',
        registrationDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Il y a 2 heures
        listings: 3,
        avatar: 'S',
        avatarColor: '#FF5252',
    },
    {
        id: 2,
        name: 'Karim Benjelloun',
        email: 'karim.b@gmail.com',
        city: 'Rabat',
        status: 'active',
        registrationDate: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        listings: 5,
        avatar: 'K',
        avatarColor: '#448AFF',
    },
    {
        id: 3,
        name: 'Fatima Zahra',
        email: 'fatima.z@gmail.com',
        city: 'Marrakech',
        status: 'active',
        registrationDate: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        listings: 2,
        avatar: 'F',
        avatarColor: '#69F0AE',
    },
];

// ==================== ANNONCES ====================
const LISTINGS_KEY = 'matlou7ch_listings';
const INITIAL_LISTINGS = [
    {
        id: 1,
        title: 'Canapé en cuir',
        userId: 2,
        userName: 'Karim Benjelloun',
        category: 'Meubles',
        location: 'Casablanca',
        description: 'Canapé 3 places en excellent état',
        condition: 'très bon état',
        status: 'published',
        isPublished: true,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        views: 45,
    },
    {
        id: 2,
        title: 'Vélo de montagne',
        userId: 3,
        userName: 'Fatima Zahra',
        category: 'Sports',
        location: 'Rabat',
        description: 'VTT en bon état, idéal pour la ville',
        condition: 'bon état',
        status: 'published',
        isPublished: true,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        views: 32,
    },
    {
        id: 3,
        title: 'Livres de cuisine',
        userId: 1,
        userName: 'Sara Alaoui',
        category: 'Livres',
        location: 'Casablanca',
        description: 'Collection de livres de recettes marocaines',
        condition: 'comme neuf',
        status: 'published',
        isPublished: true,
        createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        views: 18,
    },
];

// ==================== SIGNALEMENTS ====================
const REPORTS_KEY = 'matlou7ch_reports';
const INITIAL_REPORTS = [
    {
        id: 1,
        listingId: 1,
        listingTitle: 'Canapé en cuir',
        reportedBy: 'user123@gmail.com',
        reporterName: 'Ahmed M.',
        reason: 'spam',
        status: 'pending',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Annonce suspecte, semble être du spam',
    },
    {
        id: 2,
        listingId: 2,
        listingTitle: 'Vélo de montagne',
        reportedBy: 'user456@gmail.com',
        reporterName: 'Sanaa K.',
        reason: 'inappropriate',
        status: 'pending',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Description inappropriée',
    },
];

// ==================== FONCTIONS HELPER ====================
const initializeData = () => {
    if (!localStorage.getItem(USERS_KEY)) {
        localStorage.setItem(USERS_KEY, JSON.stringify(INITIAL_USERS));
    }
    if (!localStorage.getItem(LISTINGS_KEY)) {
        localStorage.setItem(LISTINGS_KEY, JSON.stringify(INITIAL_LISTINGS));
    }
    if (!localStorage.getItem(REPORTS_KEY)) {
        localStorage.setItem(REPORTS_KEY, JSON.stringify(INITIAL_REPORTS));
    }
};

// ==================== API UTILISATEURS ====================
export const userService = {
    getAll: () => {
        initializeData();
        return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
    },

    getById: (id) => {
        const users = userService.getAll();
        return users.find(u => u.id === parseInt(id));
    },

    create: (userData) => {
        const users = userService.getAll();
        const newUser = {
            ...userData,
            id: Date.now(),
            registrationDate: new Date().toISOString(),
            listings: 0,
            status: 'active',
        };
        users.push(newUser);
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
        return newUser;
    },

    update: (id, userData) => {
        const users = userService.getAll();
        const index = users.findIndex(u => u.id === parseInt(id));
        if (index !== -1) {
            users[index] = { ...users[index], ...userData };
            localStorage.setItem(USERS_KEY, JSON.stringify(users));
            return users[index];
        }
        return null;
    },

    delete: (id) => {
        const users = userService.getAll();
        const filtered = users.filter(u => u.id !== parseInt(id));
        localStorage.setItem(USERS_KEY, JSON.stringify(filtered));
        return true;
    },

    getStats: () => {
        const users = userService.getAll();
        const now = Date.now();
        const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

        const newUsersThisWeek = users.filter(u =>
            new Date(u.registrationDate).getTime() > weekAgo
        ).length;

        return {
            total: users.length,
            active: users.filter(u => u.status === 'active').length,
            newThisWeek: newUsersThisWeek,
        };
    },
};

// ==================== API ANNONCES ====================
export const listingService = {
    getAll: () => {
        initializeData();
        return JSON.parse(localStorage.getItem(LISTINGS_KEY) || '[]');
    },

    getById: (id) => {
        const listings = listingService.getAll();
        return listings.find(l => l.id === parseInt(id));
    },

    create: (listingData) => {
        const listings = listingService.getAll();
        const newListing = {
            ...listingData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            views: 0,
            status: 'published',
            isPublished: true,
        };
        listings.push(newListing);
        localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
        return newListing;
    },

    update: (id, listingData) => {
        const listings = listingService.getAll();
        const index = listings.findIndex(l => l.id === parseInt(id));
        if (index !== -1) {
            listings[index] = { ...listings[index], ...listingData };
            localStorage.setItem(LISTINGS_KEY, JSON.stringify(listings));
            return listings[index];
        }
        return null;
    },

    delete: (id) => {
        const listings = listingService.getAll();
        const filtered = listings.filter(l => l.id !== parseInt(id));
        localStorage.setItem(LISTINGS_KEY, JSON.stringify(filtered));
        return true;
    },

    getStats: () => {
        const listings = listingService.getAll();
        const now = Date.now();
        const weekAgo = now - 7 * 24 * 60 * 60 * 1000;

        const newListingsThisWeek = listings.filter(l =>
            new Date(l.createdAt).getTime() > weekAgo
        ).length;

        return {
            total: listings.length,
            active: listings.filter(l => l.isPublished).length,
            newThisWeek: newListingsThisWeek,
        };
    },

    getByCategory: () => {
        const listings = listingService.getAll();
        const categoryCount = {};
        listings.forEach(l => {
            categoryCount[l.category] = (categoryCount[l.category] || 0) + 1;
        });
        return categoryCount;
    },

    getByCity: () => {
        const listings = listingService.getAll();
        const cityCount = {};
        listings.forEach(l => {
            cityCount[l.location] = (cityCount[l.location] || 0) + 1;
        });
        return cityCount;
    },
};

// ==================== API SIGNALEMENTS ====================
export const reportService = {
    getAll: () => {
        initializeData();
        return JSON.parse(localStorage.getItem(REPORTS_KEY) || '[]');
    },

    getById: (id) => {
        const reports = reportService.getAll();
        return reports.find(r => r.id === parseInt(id));
    },

    create: (reportData) => {
        const reports = reportService.getAll();
        const newReport = {
            ...reportData,
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'pending',
        };
        reports.push(newReport);
        localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
        return newReport;
    },

    update: (id, reportData) => {
        const reports = reportService.getAll();
        const index = reports.findIndex(r => r.id === parseInt(id));
        if (index !== -1) {
            reports[index] = { ...reports[index], ...reportData };
            localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
            return reports[index];
        }
        return null;
    },

    delete: (id) => {
        const reports = reportService.getAll();
        const filtered = reports.filter(r => r.id !== parseInt(id));
        localStorage.setItem(REPORTS_KEY, JSON.stringify(filtered));
        return true;
    },

    getStats: () => {
        const reports = reportService.getAll();
        return {
            total: reports.length,
            pending: reports.filter(r => r.status === 'pending').length,
            resolved: reports.filter(r => r.status === 'resolved').length,
        };
    },
};

// ==================== STATS GLOBALES ====================
export const statsService = {
    getGlobalStats: () => {
        const userStats = userService.getStats();
        const listingStats = listingService.getStats();
        const reportStats = reportService.getStats();

        return {
            users: userStats.total,
            newUsers: userStats.newThisWeek,
            listings: listingStats.total,
            activeListings: listingStats.active,
            reports: reportStats.pending,
        };
    },

    getMonthlyData: () => {
        // Pour l'instant, données simulées pour les graphiques
        // TODO: Calculer depuis les données réelles
        return {
            users: [65, 78, 90, 81, 106, 120, 156],
            listings: [28, 48, 40, 59, 76, 87, 120],
        };
    },
};
