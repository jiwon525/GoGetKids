import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import {
    StyleSheet,
    SafeAreaView,
    View,
} from 'react-native';
import ProfileTop from '../../src/components/ProfileTop';
import {
    PageTitle, LeftIcon, StyledLabel, StyledContainer, ListItem,
    Colors, Subtitle, StyledScheduleView, NormText, ExtraText, InnerScheduleView, Line, MostSmallLogo,
} from '../../src/components/styles';
import { Ionicons } from '@expo/vector-icons';
import { fetchDriverTrips, fetchTripStudents } from '../../src/components/schema';
import TripDetails from '../../src/components/TripDetails';
import StudentDetails from '../../src/components/StudentDetails';
import { useUserSession } from '../../UserSessionContext';

const TripScreen = () => {
    const { userDetails, tripDetails, setTripDetails, studentDetails, setStudentDetails } = useUserSession();
    useEffect(() => {
        console.log("inside trip", userDetails);
        const fetchData = async () => {
            try {
                const fetchedTrip = await fetchDriverTrips(userDetails.email, userDetails.accessToken);
                console.log("fetchedTripcompanyname", fetchedTrip.company_name);
                if (fetchedTrip) {
                    console.log("inside if condition", fetchedTrip);
                    setTripDetails(fetchedTrip);
                    console.log("tripdDetails set", tripDetails);
                }
                else {
                    console.log("Schedule for student not found");
                }

                const fetchedStudentDetails = await fetchTripStudents(tripDetails.school_name, tripDetails.zone, userDetails.accessToken);
                console.log(fetchedStudentDetails);
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
            } catch (error) {
                // Handle any errors that occur during the fetching process
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <ProfileTop name="Your Schedule" />
                <View style={styles.placeholder}>
                    <View style={styles.placeholderInset}>
                        <PageTitle>{tripDetails.school_name}</PageTitle>
                        <ExtraText>Transport Zone:{tripDetails.zone}</ExtraText>
                        <Line></Line>
                        <StyledScheduleView>
                            <Ionicons name="bus-outline" size={30} color="black" />
                            <InnerScheduleView>
                                <NormText>Vehicle Plate: {tripDetails.vehicle_number}</NormText>
                            </InnerScheduleView>
                        </StyledScheduleView>
                        <StyledContainer>
                            {studentDetails && studentDetails.length > 0 ? (
                                studentDetails.map((student, index) => (
                                    <StyledContainer key={student._id || student.studentid}>
                                        <StyledScheduleView list={true}>
                                            <MostSmallLogo
                                                resizeMode="contain" source={require('../../src/assets/student.png')} />
                                            <InnerScheduleView>
                                                <ExtraText>{student.firstname} {student.lastname}</ExtraText>
                                            </InnerScheduleView>
                                        </StyledScheduleView>
                                        <ListItem>
                                            <NormText>{student.address}</NormText>
                                        </ListItem>
                                        <ListItem>
                                            <NormText>{student.postcode}</NormText>
                                        </ListItem>

                                        <Line></Line>
                                    </StyledContainer>

                                ))
                            ) : (
                                <NormText>No students linked yet</NormText>
                            )}
                        </StyledContainer>

                        <Line></Line>
                    </View>
                </View>
            </StyledContainer>
        </SafeAreaView>
    );
};

/**
 * 
 * 



                            
 */

const styles = StyleSheet.create({
    placeholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    /** Placeholder */
    placeholder: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        height: 400,
        marginTop: 0,
        padding: 0,
        backgroundColor: 'transparent',
    },
});
export default TripScreen;