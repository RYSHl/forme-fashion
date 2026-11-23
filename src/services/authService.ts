import { UserProfile } from '../types/user';
import { ShippingAddress } from '../types/order';

const USER_STORAGE_KEY = 'forme_current_user';

export const DEMO_USER: UserProfile = {
  id: 'usr-9281',
  name: 'Aarav Mehta',
  email: 'aarav.mehta@example.com',
  phone: '+91 98765 43210',
  role: 'customer',
  createdAt: '2026-06-15T00:00:00Z',
  savedAddresses: [
    {
      fullName: 'Aarav Mehta',
      email: 'aarav.mehta@example.com',
      phone: '+91 98765 43210',
      addressLine1: 'B-402, Lodha Bellissimo, NM Joshi Marg',
      addressLine2: 'Lower Parel West',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400013',
      country: 'India',
      isDefault: true,
    },
    {
      fullName: 'Aarav Mehta',
      email: 'aarav.mehta@example.com',
      phone: '+91 98765 43210',
      addressLine1: '12th Floor, WeWork Galaxy, Residency Road',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560025',
      country: 'India',
      isDefault: false,
    }
  ]
};

export const DEMO_ADMIN: UserProfile = {
  id: 'usr-admin-01',
  name: 'Store Administrator',
  email: 'admin@forme.com',
  phone: '+91 98765 00000',
  role: 'admin',
  createdAt: '2026-01-01T00:00:00Z',
  savedAddresses: [],
};

export const authService = {
  getCurrentUser: (): UserProfile | null => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error(e);
    }
    // Default to demo user for seamless interactive testing
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(DEMO_USER));
    } catch (e) {
      console.error(e);
    }
    return DEMO_USER;
  },

  login: (email: string, _password: string, asAdmin: boolean = false): UserProfile => {
    const userToSet = asAdmin || email.toLowerCase().includes('admin') ? DEMO_ADMIN : {
      ...DEMO_USER,
      email: email.trim(),
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userToSet));
    return userToSet;
  },

  register: (name: string, email: string, phone?: string): UserProfile => {
    const newUser: UserProfile = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      name,
      email,
      phone,
      role: 'customer',
      savedAddresses: [],
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    return newUser;
  },

  logout: (): void => {
    localStorage.removeItem(USER_STORAGE_KEY);
  },

  updateProfile: (updates: Partial<UserProfile>): UserProfile => {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Not logged in');
    const updated = { ...user, ...updates };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  addAddress: (address: ShippingAddress): UserProfile => {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Not logged in');
    
    // If it's the first address or set as default, mark existing as not default
    const savedAddresses = user.savedAddresses.map(a => address.isDefault ? { ...a, isDefault: false } : a);
    const updatedAddresses = [...savedAddresses, address];
    
    const updatedUser = { ...user, savedAddresses: updatedAddresses };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  removeAddress: (index: number): UserProfile => {
    const user = authService.getCurrentUser();
    if (!user) throw new Error('Not logged in');
    const updatedAddresses = user.savedAddresses.filter((_, i) => i !== index);
    const updatedUser = { ...user, savedAddresses: updatedAddresses };
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  }
};
