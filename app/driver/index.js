import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import {
    StyleSheet,
    SafeAreaView,
    View, Dimensions,
} from 'react-native';
import ProfileTop from '../../src/components/ProfileTop';
import {
    PageTitle, LeftIcon, StyledLabel, StyledContainer, ListItem, CardTextStatus,
    Colors, Subtitle, StyledScheduleView, NormText, ExtraText, InnerScheduleView, Line, MostSmallLogo, InnerContainer,
} from '../../src/components/styles';
import { Ionicons } from '@expo/vector-icons';
import { fetchDriverTrips, fetchTripStudents } from '../../src/components/schema';
import TripDetails from '../../src/components/TripDetails';
import StudentDetails from '../../src/components/StudentDetails';
import { useUserSession } from '../../UserSessionContext';

const TripScreen = () => {
    const { userDetails, tripDetails, setTripDetails, studentDetails, setStudentDetails } = useUserSession();
    const [trip, setTrip] = useState({});
    const [studentarray, setStudents] = useState({});
    const saveTrip = async () => {
        try {
            const fetchedTrip = await fetchDriverTrips(userDetails.email, userDetails.accessToken);
            const trip = new TripDetails(
                fetchedTrip._id,
                fetchedTrip.tripId,
                fetchedTrip.vehicle_number,
                fetchedTrip.driver_email,
                fetchedTrip.company_name,
                fetchedTrip.school_name,
                fetchedTrip.zone,
                fetchedTrip.start_time,
                fetchedTrip.end_time
            );
            console.log("the trip s", trip);
            return trip;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };
    const saveStudents = async (name, zone, token) => {
        try {
            console.log("getting std ", name, zone, token);
            const getStudents = await fetchTripStudents(name, zone, token);
            const studentDetailsArray = getStudents.map(student =>
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
            console.log("student array", studentDetailsArray);
            return studentDetailsArray;
        } catch (error) {
            console.error('Error fetching data:', error);
            return null;
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const trip = await saveTrip();
                setTrip(trip);
                const students = await saveStudents(trip.school_name, trip.zone, userDetails.accessToken);
                setStudents(students);
                setTripDetails(trip);
                setStudentDetails(students);
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

                <View style={styles.placeholderInset}>
                    <PageTitle>{trip.school_name}</PageTitle>
                    <ExtraText>Transport Zone:{trip.zone}</ExtraText>
                    <Line></Line>
                    <StyledScheduleView>
                        <Ionicons name="bus-outline" size={30} color="black" />
                        <InnerScheduleView>
                            <NormText>Vehicle Plate: {trip.vehicle_number}</NormText>
                        </InnerScheduleView>
                    </StyledScheduleView>
                    <Line></Line>
                    <StyledContainer>
                        {studentarray && studentarray.length > 0 ? (
                            studentarray.map((student, index) => (
                                <StyledContainer key={student._id || student.studentid}>
                                    <StyledScheduleView list={true}>
                                        <MostSmallLogo
                                            resizeMode="contain" source={require('../../src/assets/student.png')} />
                                        <InnerScheduleView>
                                            <ExtraText>{student.firstname} {student.lastname}</ExtraText>
                                        </InnerScheduleView>
                                    </StyledScheduleView>
                                    <View style={styles.align}>
                                        <View style={styles.cardContainer}>
                                            <CardTextStatus>Status : {student.status} </CardTextStatus>
                                        </View>
                                    </View>
                                    <NormText>  Address: {student.address}</NormText>
                                    <NormText>  Postal Code: {student.postcode}</NormText>
                                    <Line></Line>
                                </StyledContainer>

                            ))
                        ) : (
                            <NormText>No students linked yet</NormText>
                        )}
                    </StyledContainer>
                    <Line></Line>
                </View>

            </StyledContainer>
        </SafeAreaView>
    );
};

const deviceWidth = Dimensions.get('window').width;
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
    align: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        width: deviceWidth * 0.9,
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: Colors.plain,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
});
export default TripScreen;