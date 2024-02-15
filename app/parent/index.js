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
import { fetchStudentData } from '../../src/components/schema';
import StudentDetails from '../../src/components/StudentDetails';


const HomeScreen = () => {
    const { userDetails, studentDetails, setStudentDetails } = useUserSession();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedStudentDetails = await fetchStudentData(userDetails.email, userDetails.accessToken);

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
                            accessToken={userDetails.accessToken}
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
