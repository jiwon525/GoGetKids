import React, { useEffect, } from 'react';
import { Link, useLocalSearchParams, router } from 'expo-router';
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
import { ScrollView } from 'react-native-gesture-handler';

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

                const schedulesPromises = studentDetailsArray.map(async (student) => {
                    const s = await fetchSchedule(student.studentid, userDetails.accessToken);
                    console.log(s);
                    return s.map(schedule =>
                        new ScheduleDetails(
                            schedule._id,
                            schedule.date,
                            student.firstname,
                            student.lastname,
                            schedule.school_name,
                            student.class_name,
                            student.status,
                            student.studentid,
                            schedule.transport_type,
                            schedule.pickup_time,
                            schedule.dismissal_time
                        )
                    );
                });
                const resolvedSchedules = await Promise.all(schedulesPromises);
                console.log("Schedules for all students: ", resolvedSchedules.flat()); // Use .flat() to flatten the array of arrays
                setScheduleDetails(resolvedSchedules.flat());
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <InnerContainer>
                    {studentDetails && studentDetails.length > 0 ? (
                        studentDetails.map((student, index) => (
                            <Card
                                key={student._id}
                                index={index}
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
            </ScrollView>
        </StyledContainer>
    );
};

export default HomeScreen;
