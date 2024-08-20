import { createContext, useEffect, useContext, useState } from 'react';

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
    // The user data and authentication state are stored in the SessionProvider component.
    const [userData, setUserData] = useState({});
    const [authenticated, setAuthenticated] = useState(() => {
        // Get the authentication state from the local storage.
        const storedAuthenticated = localStorage.getItem('authenticated');
        return storedAuthenticated ? JSON.parse(storedAuthenticated) : false;
    });

    // Get the user data at the first render.
    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
        }
    }, []);

    const updateUserData = (newData) => {
        setUserData({ ...userData, ...newData });
        localStorage.setItem('userData', JSON.stringify(newData));
        setAuthenticated(true);
        localStorage.setItem('authenticated', JSON.stringify(true));
    };

    const deleteUserData = () => {
        setUserData({});
        localStorage.removeItem('userData');
        setAuthenticated(false);
        localStorage.removeItem('authenticated');
    };

    return (
        <SessionContext.Provider value={{ authenticated, userData, updateUserData, deleteUserData }}>
            {children}
        </SessionContext.Provider>
    );
    
};

export const useSession = () => {
    return useContext(SessionContext);
};