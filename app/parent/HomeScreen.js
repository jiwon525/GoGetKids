import React, { useEffect, } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { useUserSession } from '../../UserSessionContext';
import {
    StyledContainer,
    InnerContainer,
    NormText, HomeImage,
} from '../../src/components/styles';
import Card from '../../src/components/Card';
import ProfileTop from '../../src/components/ProfileTop';
import { fetchUserData, fetchStudentData } from '../../src/components/schema';
import StudentDetails from '../../src/components/StudentDetails';
import UserDetails from '../../src/components/UserDetails';

const HomeScreen = () => {
    const params = useLocalSearchParams();
    const { userId, accessToken, refreshToken } = params;
    const { setUserDetails, studentDetails, setStudentDetails } = useUserSession();
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user details
                console.log("userid", userId);
                const fetchedUserDetails = await fetchUserData(userId, accessToken, refreshToken);
                console.log("fetching user details frm function");
                const userD = new UserDetails(
                    fetchedUserDetails.accessToken,
                    fetchedUserDetails.refreshToken,
                    fetchedUserDetails._id,
                    fetchedUserDetails.email,
                    fetchedUserDetails.role,
                    fetchedUserDetails.firstName,
                    fetchedUserDetails.lastName,
                    fetchedUserDetails.company_name,
                    fetchedUserDetails.school_name,
                );
                setUserDetails(userD);
                console.log("saved user data", userD);
                // Fetch student details
                const fetchedStudentDetails = await fetchStudentData(userD.email, accessToken);

                // Check if fetchedStudentDetails is an array
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
            <HomeImage resizeMode="contain" source={require('../../src/assets/childrenhome.png')} />
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
                            accessToken={accessToken}
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
