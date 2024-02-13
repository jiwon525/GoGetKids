import React, { useEffect, useMemo } from 'react';
import { useUserSession } from '../../UserSessionContext';
import {
    StyledContainer,
    InnerContainer,
    NormText, HomeImage,
} from '../components/styles';
import Card from '../components/Card';
import ProfileTop from '../components/ProfileTop';
import { fetchUserData, fetchStudentData } from '../components/schema';
import StudentDetails from '../components/StudentDetails';
import UserDetails from '../components/UserDetails';

const HomeScreen = ({ navigation, route }) => {
    const { userId, accessToken, refreshToken } = route.params;
    const { userDetails, setUserDetails, studentDetails, setStudentDetails } = useUserSession();
    console.log("userdetails EMAIL", userDetails.email);
    const fetchedUserDetails = useMemo(() => fetchUserData(userId, accessToken, refreshToken), [userId, accessToken, refreshToken]);
    const fetchedStudentDetails = useMemo(() => fetchStudentData(userDetails.email, accessToken), [userId, accessToken]);
    useEffect(() => {
        setUserDetails(fetchedUserDetails);
        setStudentDetails(fetchedStudentDetails);
        const fetchData = async () => {
            console.log("fetched", fetchedUserDetails.email, "just user", userDetails.email)
            console.log("fetched students", fetchedStudentDetails);
            try {
                if (Array.isArray(fetchedStudentDetails)) {
                    // Map fetchedStudentDetails to StudentDetails objects
                    const studentDetailsArray = fetchedStudentDetails.map(student =>
                        new StudentDetails(
                            student._id,
                            student.address,
                            student.class_name,
                            student.dob,
                            student.firstname,
                            student.gender,
                            student.lastname,
                            student.parent_id,
                            student.postcode,
                            student.school_name,
                            student.status,
                            student.studentid,
                            student.zone
                        )
                    );
                    // Set studentDetails
                    setStudentDetails(studentDetailsArray);
                } else {
                    // Handle the case when fetchedStudentDetails is not an array
                    console.error('Error fetching student details:', fetchedStudentDetails);
                }
            } catch (error) {
                // Handle any errors that occur during the fetching process
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <StyledContainer>
            <HomeImage resizeMode="contain" source={require('../assets/childrenhome.png')} />
            <ProfileTop name="Home" />
            <InnerContainer>
                {studentDetails && studentDetails.length > 0 ? (
                    studentDetails.map((student, index) => (
                        <Card
                            key={student._id}
                            firstName={student.firstname}
                            lastName={student.lastname}
                            status={student.status}
                            school={student.school_name}
                            grade={student.class_name}
                            studentID={student.studentid.toString()}
                            onPress={() => navigation.navigate("Child")}
                        />
                    ))
                ) : (
                    <NormText>No students linked yet</NormText>
                )}
            </InnerContainer>

        </StyledContainer>
    );
};

export default HomeScreen;
