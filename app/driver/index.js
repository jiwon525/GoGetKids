import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import {
    StyleSheet,
    SafeAreaView,
    View, FlatList,
    TouchableWithoutFeedback,
    Text,
    Dimensions,
} from 'react-native';
import ProfileTop from '../../src/components/ProfileTop';
import moment from 'moment';
import {
    PageTitle, LeftIcon, StyledLabel, StyledContainer, ListItem,
    Colors, Subtitle, StyledScheduleView, NormText, ExtraText, InnerScheduleView, Line, MostSmallLogo,
} from '../../src/components/styles';
import { Ionicons } from '@expo/vector-icons';
import { fetchDriverTrips, fetchTripStudents } from '../../src/components/schema';
import TripDetails from '../../src/components/TripDetails';
import StudentDetails from '../../src/components/StudentDetails';
import { ScrollView } from 'react-native-gesture-handler';

const TripScreen = () => {
    const { userDetails, tripDetails, setTripDetails, studentDetails, setStudentDetails } = useUserSession();
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(userDetails.email);
                const fetchedTrip = await fetchDriverTrips(userDetails.email, userDetails.accessToken);
                console.log(fetchedTrip);
                const tripD = new TripDetails(
                    fetchedTrip._id,
                    fetchedTrip.vehicle_number,
                    fetchedTrip.driver_email,
                    fetchedTrip.company_name,
                    fetchedTrip.school_name,
                    fetchedTrip.zone,
                    fetchedTrip.start_time,
                    fetchedTrip.end_time,
                );
                setTripDetails(tripD);
                const fetchedStudentDetails = await fetchTripStudents(fetchedTrip.school_name, fetchedTrip.zone, userDetails.accessToken);
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
                        <ExtraText>{tripDetails.zone}</ExtraText>
                        <Line></Line>
                        <StyledScheduleView>
                            <Ionicons name="bus-outline" size={30} color="black" />
                            <InnerScheduleView>
                                <NormText>{vehiclenum}</NormText>
                            </InnerScheduleView>
                        </StyledScheduleView>
                        <StyledContainer>
                            <Line></Line>
                            {studentDetails && studentDetails.length > 0 ? (
                                studentDetails.map((student, index) => (
                                    <StyledContainer>
                                        <StyledScheduleView>
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
                    </View>
                </View>
            </StyledContainer>
        </SafeAreaView>
    );
};



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