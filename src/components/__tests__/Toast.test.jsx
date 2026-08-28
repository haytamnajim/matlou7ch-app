import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Toast, ToastContainer } from '../Toast';

describe('Toast Component', () => {
  it('renders toast with message', () => {
    render(<Toast message="Test message" type="success" onClose={() => {}} />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('renders correct icon for success type', () => {
    render(<Toast message="Success" type="success" onClose={() => {}} />);
    const icon = document.querySelector('.toast-icon');
    expect(icon).toHaveTextContent('✓');
  });

  it('renders correct icon for error type', () => {
    render(<Toast message="Error" type="error" onClose={() => {}} />);
    const icon = document.querySelector('.toast-icon');
    expect(icon).toHaveTextContent('✕');
  });

  it('calls onClose when close button is clicked', () => {
    const handleClose = jest.fn();
    render(<Toast message="Test" type="success" onClose={handleClose} />);
    
    const closeButton = screen.getByText('×');
    fireEvent.click(closeButton);
    
    expect(handleClose).toHaveBeenCalled();
  });

  it('auto-dismisses after duration', async () => {
    const handleClose = jest.fn();
    render(<Toast message="Test" type="success" duration={1000} onClose={handleClose} />);
    
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalled();
    }, { timeout: 1500 });
  });

  it('renders ToastContainer with multiple toasts', () => {
    const toasts = [
      { id: 1, message: 'First toast', type: 'success' },
      { id: 2, message: 'Second toast', type: 'error' },
    ];
    
    render(
      <ToastContainer 
        toasts={toasts} 
        removeToast={() => {}} 
      />
    );
    
    expect(screen.getByText('First toast')).toBeInTheDocument();
    expect(screen.getByText('Second toast')).toBeInTheDocument();
  });
});
