import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserSession {
  email: string;
  name: string;
  phone?: string;
  role: 'admin' | 'customer';
}

interface AuthContextType {
  user: UserSession | null;
  isAdmin: boolean;
  loginAsAdmin: (secretKey: string) => boolean;
  loginCustomer: (name: string, phone: string, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(() => {
    try {
      const saved = sessionStorage.getItem('ghovedika_auth_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('ghovedika_auth_user', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('ghovedika_auth_user');
    }
  }, [user]);

  const loginAsAdmin = (secretKey: string): boolean => {
    // Standard master passcode or admin login check
    if (secretKey === 'admin123' || secretKey === 'ghovedika8008' || secretKey === 'admin') {
      const adminUser: UserSession = {
        email: 'admin@ghovedika.store',
        name: 'Ghovedika Admin',
        phone: '8008588599',
        role: 'admin',
      };
      setUser(adminUser);
      return true;
    }
    return false;
  };

  const loginCustomer = (name: string, phone: string, email: string) => {
    const customerUser: UserSession = {
      name,
      phone,
      email,
      role: 'customer',
    };
    setUser(customerUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: user?.role === 'admin',
      loginAsAdmin,
      loginCustomer,
      logout
    }}>
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
