import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // Check localStorage for persisted login
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('emperor_user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    const login = (password) => {
        // Simple secure-ish check for demo purposes
        if (password === 'admin123') {
            const adminUser = { name: 'Admin', role: 'admin' };
            setUser(adminUser);
            localStorage.setItem('emperor_user', JSON.stringify(adminUser));
            return true;
        }
        return false;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('emperor_user');
    };

    const isAdmin = user?.role === 'admin';

    return (
        <AuthContext.Provider value={{ user, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};
