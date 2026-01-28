import React, { createContext, useContext, useState } from 'react';

const ContactContext = createContext();

export const useContact = () => {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error('useContact must be used within ContactProvider');
    }
    return context;
};

export const ContactProvider = ({ children }) => {
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [contactSubject, setContactSubject] = useState('');

    const openContact = (subject = '') => {
        setContactSubject(subject);
        setIsContactOpen(true);
    };

    const closeContact = () => {
        setIsContactOpen(false);
        setContactSubject('');
    };

    return (
        <ContactContext.Provider value={{
            isContactOpen,
            contactSubject,
            openContact,
            closeContact
        }}>
            {children}
        </ContactContext.Provider>
    );
};

export default ContactContext;
