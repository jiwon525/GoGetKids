import React, { createContext, useState, useContext } from 'react';
import UserDetails from './src/components/UserDetails';
//import StudentDetails from './src/components/StudentDetails';
const UserSessionContext = createContext();

export const UserSessionProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState(null);
    const [studentDetails, setStudentDetails] = useState(null);
    const [tripDetails, setTripDetails] = useState(null);
    const [scheduleDetails, setScheduleDetails] = useState(null);
    return (
        <UserSessionContext.Provider value={{
            userDetails, setUserDetails, studentDetails, setStudentDetails, tripDetails, setTripDetails,
            scheduleDetails, setScheduleDetails
        }}>
            {children}
        </UserSessionContext.Provider>
    );
};

export const useUserSession = () => useContext(UserSessionContext);
