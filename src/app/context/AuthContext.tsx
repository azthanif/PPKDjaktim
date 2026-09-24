import { createContext, useContext, useState } from 'react';

export interface User {
  fullName: string;
  email: string;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => { success: boolean; error?: string };
  logout: () => void;
  deleteAccount: () => void;
  isDeleted: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => ({ success: true }),
  logout: () => {},
  deleteAccount: () => {},
  isDeleted: () => false,
});

const getDeletedEmails = (): string[] => {
  try {
    const saved = localStorage.getItem('ppkd_deleted_emails');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const getRegisteredUsers = (): User[] => {
  try {
    const saved = localStorage.getItem('ppkd_registered_users');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('ppkd_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const isDeleted = (email: string) => getDeletedEmails().includes(email.toLowerCase());

  const login = (userData: User): { success: boolean; error?: string } => {
    if (isDeleted(userData.email)) {
      return { success: false, error: 'Akun dengan email ini telah dihapus. Silakan buat akun baru.' };
    }
    // Simpan ke registered users jika belum ada
    const users = getRegisteredUsers();
    const exists = users.find(u => u.email.toLowerCase() === userData.email.toLowerCase());
    if (!exists) {
      users.push(userData);
      localStorage.setItem('ppkd_registered_users', JSON.stringify(users));
    }
    setUser(userData);
    localStorage.setItem('ppkd_user', JSON.stringify(userData));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ppkd_user');
  };

  const deleteAccount = () => {
    if (!user) return;
    // Tambahkan email ke daftar yang dihapus
    const deleted = getDeletedEmails();
    if (!deleted.includes(user.email.toLowerCase())) {
      deleted.push(user.email.toLowerCase());
      localStorage.setItem('ppkd_deleted_emails', JSON.stringify(deleted));
    }
    // Hapus dari registered users
    const users = getRegisteredUsers().filter(u => u.email.toLowerCase() !== user.email.toLowerCase());
    localStorage.setItem('ppkd_registered_users', JSON.stringify(users));
    // Logout
    setUser(null);
    localStorage.removeItem('ppkd_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, deleteAccount, isDeleted }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
