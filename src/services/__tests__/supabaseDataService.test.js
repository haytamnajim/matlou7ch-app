import { userService, listingService, reportService } from '../supabaseDataService';

// Mock Supabase client
jest.mock('../config/supabaseClient', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(),
        })),
        order: jest.fn(() => ({
          range: jest.fn(() => ({
            count: jest.fn(),
          })),
        })),
        range: jest.fn(() => ({
          count: jest.fn(),
        })),
      })),
      insert: jest.fn(() => ({
        select: jest.fn(),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(),
      })),
      delete: jest.fn(() => ({
        eq: jest.fn(),
      })),
    })),
  },
}));

describe('Supabase Data Services', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('userService', () => {
    it('should have getAll method', () => {
      expect(userService.getAll).toBeDefined();
      expect(typeof userService.getAll).toBe('function');
    });

    it('should have getPaginated method', () => {
      expect(userService.getPaginated).toBeDefined();
      expect(typeof userService.getPaginated).toBe('function');
    });

    it('should have getById method', () => {
      expect(userService.getById).toBeDefined();
      expect(typeof userService.getById).toBe('function');
    });

    it('should have create method', () => {
      expect(userService.create).toBeDefined();
      expect(typeof userService.create).toBe('function');
    });

    it('should have update method', () => {
      expect(userService.update).toBeDefined();
      expect(typeof userService.update).toBe('function');
    });

    it('should have delete method', () => {
      expect(userService.delete).toBeDefined();
      expect(typeof userService.delete).toBe('function');
    });

    it('should have getStats method', () => {
      expect(userService.getStats).toBeDefined();
      expect(typeof userService.getStats).toBe('function');
    });
  });

  describe('listingService', () => {
    it('should have getAll method', () => {
      expect(listingService.getAll).toBeDefined();
      expect(typeof listingService.getAll).toBe('function');
    });

    it('should have getPaginated method', () => {
      expect(listingService.getPaginated).toBeDefined();
      expect(typeof listingService.getPaginated).toBe('function');
    });

    it('should have getById method', () => {
      expect(listingService.getById).toBeDefined();
      expect(typeof listingService.getById).toBe('function');
    });

    it('should have create method', () => {
      expect(listingService.create).toBeDefined();
      expect(typeof listingService.create).toBe('function');
    });

    it('should have update method', () => {
      expect(listingService.update).toBeDefined();
      expect(typeof listingService.update).toBe('function');
    });

    it('should have delete method', () => {
      expect(listingService.delete).toBeDefined();
      expect(typeof listingService.delete).toBe('function');
    });

    it('should have search method', () => {
      expect(listingService.search).toBeDefined();
      expect(typeof listingService.search).toBe('function');
    });

    it('should have getByUserId method', () => {
      expect(listingService.getByUserId).toBeDefined();
      expect(typeof listingService.getByUserId).toBe('function');
    });
  });

  describe('reportService', () => {
    it('should have getAll method', () => {
      expect(reportService.getAll).toBeDefined();
      expect(typeof reportService.getAll).toBe('function');
    });

    it('should have getById method', () => {
      expect(reportService.getById).toBeDefined();
      expect(typeof reportService.getById).toBe('function');
    });

    it('should have create method', () => {
      expect(reportService.create).toBeDefined();
      expect(typeof reportService.create).toBe('function');
    });

    it('should have update method', () => {
      expect(reportService.update).toBeDefined();
      expect(typeof reportService.update).toBe('function');
    });

    it('should have delete method', () => {
      expect(reportService.delete).toBeDefined();
      expect(typeof reportService.delete).toBe('function');
    });

    it('should have getStats method', () => {
      expect(reportService.getStats).toBeDefined();
      expect(typeof reportService.getStats).toBe('function');
    });
  });
});
