
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
});

// Mock user database for testing purposes
const mockUsers = [
  { id: '1', username: 'admin', password: 'admin123', role: 'admin' },
  { id: '2', username: 'manager', password: 'manager123', role: 'manager' },
  { id: '3', username: 'employee', password: 'employee123', role: 'employee' },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log('User authenticated from localStorage:', parsedUser);
        } else {
          console.log('No user found in localStorage');
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      console.log('Attempting login for user:', username);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Find user in mock database
      const foundUser = mockUsers.find(
        u => u.username === username && u.password === password
      );
      
      if (!foundUser) {
        console.error('Login failed: Invalid credentials');
        throw new Error('Invalid username or password');
      }
      
      // Create user object without password
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Create mock token
      const token = `mock-token-${Date.now()}`;
      
      // Store in localStorage
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      setUser(userWithoutPassword);
      console.log('Login successful for user:', userWithoutPassword);
      
      // Navigate to dashboard
      navigate('/dashboard');
      
      toast({
        title: 'Logged in successfully',
        description: `Welcome back, ${userWithoutPassword.username}!`,
      });
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
      });
      throw error; // Re-throw to let the login component handle it
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Logging out user');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
