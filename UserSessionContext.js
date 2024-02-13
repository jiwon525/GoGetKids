import React, { createContext, useState, useContext } from 'react';
import UserDetails from './src/components/UserDetails';
//import StudentDetails from './src/components/StudentDetails';
const UserSessionContext = createContext();

export const UserSessionProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [studentDetails, setStudentDetails] = useState(null);
    return (
        <UserSessionContext.Provider value={{ userDetails, setUserDetails, studentDetails, setStudentDetails }}>
            {children}
        </UserSessionContext.Provider>
    );
};

export const useUserSession = () => useContext(UserSessionContext);
