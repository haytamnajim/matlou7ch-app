import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../AuthContext';

// Mock Supabase client
jest.mock('../config/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      deleteUser: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  },
}));

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides auth context to children', () => {
    const TestComponent = () => {
      const { user, loading } = useAuth();
      return (
        <div>
          <div data-testid="loading">{loading ? 'true' : 'false'}</div>
          <div data-testid="user">{user ? 'logged in' : 'not logged in'}</div>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('loading')).toHaveTextContent('true');
    expect(screen.getByTestId('user')).toHaveTextContent('not logged in');
  });

  it('provides login function', () => {
    const TestComponent = () => {
      const { login } = useAuth();
      return (
        <button onClick={() => login('test@example.com', 'password')}>
          Login
        </button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
  });

  it('provides signup function', () => {
    const TestComponent = () => {
      const { signup } = useAuth();
      return (
        <button onClick={() => signup('test@example.com', 'password', 'Test User')}>
          Signup
        </button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const signupButton = screen.getByText('Signup');
    expect(signupButton).toBeInTheDocument();
  });

  it('provides logout function', () => {
    const TestComponent = () => {
      const { logout } = useAuth();
      return (
        <button onClick={logout}>
          Logout
        </button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toBeInTheDocument();
  });

  it('provides deleteAccount function', () => {
    const TestComponent = () => {
      const { deleteAccount } = useAuth();
      return (
        <button onClick={deleteAccount}>
          Delete Account
        </button>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const deleteButton = screen.getByText('Delete Account');
    expect(deleteButton).toBeInTheDocument();
  });
});
