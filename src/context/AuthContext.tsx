import React, { createContext, useContext, useState } from 'react';
import { UserProfile } from '../types/user';
import { ShippingAddress } from '../types/order';
import { authService } from '../services/authService';
import { useToast } from './ToastContext';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string, asAdmin?: boolean) => void;
  register: (name: string, email: string, phone?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addAddress: (address: ShippingAddress) => void;
  removeAddress: (index: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => authService.getCurrentUser());
  const { showToast } = useToast();

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const login = (email: string, password?: string, asAdmin: boolean = false) => {
    const loggedUser = authService.login(email, password || 'password', asAdmin);
    setUser(loggedUser);
    showToast(`Welcome back, ${loggedUser.name}`, 'success');
  };

  const register = (name: string, email: string, phone?: string) => {
    const newUser = authService.register(name, email, phone);
    setUser(newUser);
    showToast(`Account created for ${newUser.name}`, 'success');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    showToast('Signed out of FORME', 'info');
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    const updated = authService.updateProfile(updates);
    setUser(updated);
    showToast('Profile updated', 'success');
  };

  const addAddress = (address: ShippingAddress) => {
    const updated = authService.addAddress(address);
    setUser(updated);
    showToast('Address saved', 'success');
  };

  const removeAddress = (index: number) => {
    const updated = authService.removeAddress(index);
    setUser(updated);
    showToast('Address removed', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
