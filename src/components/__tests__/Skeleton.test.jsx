import React from 'react';
import { render, screen } from '@testing-library/react';
import { SkeletonCard, SkeletonTable, SkeletonGrid } from '../Skeleton';

describe('Skeleton Components', () => {
  describe('SkeletonCard', () => {
    it('renders skeleton card with image and content', () => {
      render(<SkeletonCard />);
      expect(document.querySelector('.skeleton-card')).toBeInTheDocument();
      expect(document.querySelector('.skeleton-image')).toBeInTheDocument();
      expect(document.querySelector('.skeleton-content')).toBeInTheDocument();
    });

    it('renders skeleton title', () => {
      render(<SkeletonCard />);
      expect(document.querySelector('.skeleton-title')).toBeInTheDocument();
    });

    it('renders skeleton text elements', () => {
      render(<SkeletonCard />);
      const textElements = document.querySelectorAll('.skeleton-text');
      expect(textElements.length).toBeGreaterThan(0);
    });
  });

  describe('SkeletonTable', () => {
    it('renders skeleton table with header and rows', () => {
      render(<SkeletonTable rows={3} />);
      expect(document.querySelector('.skeleton-table')).toBeInTheDocument();
      expect(document.querySelector('.skeleton-header')).toBeInTheDocument();
    });

    it('renders correct number of rows', () => {
      render(<SkeletonTable rows={5} />);
      const rows = document.querySelectorAll('.skeleton-row');
      expect(rows.length).toBe(5);
    });

    it('renders default number of rows when not specified', () => {
      render(<SkeletonTable />);
      const rows = document.querySelectorAll('.skeleton-row');
      expect(rows.length).toBe(5);
    });

    it('renders skeleton cells in each row', () => {
      render(<SkeletonTable rows={2} />);
      const cells = document.querySelectorAll('.skeleton-cell');
      expect(cells.length).toBeGreaterThan(0);
    });
  });

  describe('SkeletonGrid', () => {
    it('renders skeleton grid with cards', () => {
      render(<SkeletonGrid items={4} />);
      expect(document.querySelector('.skeleton-grid')).toBeInTheDocument();
    });

    it('renders correct number of skeleton cards', () => {
      render(<SkeletonGrid items={6} />);
      const cards = document.querySelectorAll('.skeleton-card');
      expect(cards.length).toBe(6);
    });

    it('renders default number of items when not specified', () => {
      render(<SkeletonGrid />);
      const cards = document.querySelectorAll('.skeleton-card');
      expect(cards.length).toBe(6);
    });
  });
});
