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
import { fetchStudentData, fetchSchedule } from '../../src/components/schema';
import StudentDetails from '../../src/components/StudentDetails';
import ScheduleDetails from '../../src/components/ScheduleDetails';

const HomeScreen = () => {
    const { userDetails, studentDetails, setStudentDetails, setScheduleDetails } = useUserSession();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedStudentDetails = await fetchStudentData(userDetails.email, userDetails.accessToken);
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
                setStudentDetails(studentDetailsArray);
                const schedules = studentDetailsArray.map(async (student) => {
                    const s = await fetchSchedule(student.studentid, userDetails.accessToken);
                    return new ScheduleDetails(
                        s._id,
                        s.date,
                        student.firstname,
                        student.lastname,
                        student.school_name,
                        student.class_name,
                        student.status,
                        student.studentid,
                        s.transport_type,
                        s.pickup_time,
                        s.dismissal_time
                    );
                });
                const resolvedSchedules = await Promise.all(schedules);
                console.log("Schedules for all students: ", resolvedSchedules);
                setScheduleDetails(resolvedSchedules);
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
