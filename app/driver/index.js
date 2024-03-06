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
import { fetchDriverTrips, fetchTripStudents, loadTrips } from '../../src/components/schema';
import { useUserSession } from '../../UserSessionContext';
import moment from 'moment';
import TripDetails from '../../src/components/TripDetails';
import { ScrollView } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

const TripScreen = () => {
    const { userDetails, tripDetails, setTripDetails, studentDetails, setStudentDetails } = useUserSession();
    const today = moment().format('YYYY-MM-DD');
    const [oneTrip, setOneTrip] = useState({});
    const isFocused = useIsFocused();
    useEffect(() => {
        console.log("when loading tripscreen");
        console.log("Updated tripDetails:", tripDetails);
        const fetchData = async () => {
            try {
                const { tripArray, studentArray } = await loadTrips(userDetails.email, userDetails.accessToken);
                console.log("inside the driver trip array", tripArray);
                setTripDetails(tripArray);
                setStudentDetails(studentArray);
                const selectT = tripArray.find(trip => trip.date === today);
                if (selectT) {
                    const newTrip = new TripDetails(
                        selectT._id,
                        selectT.tripId,
                        selectT.vehicle_number,
                        selectT.driver_email,
                        selectT.company_name,
                        selectT.date,
                        selectT.school_name,
                        selectT.zone,
                        selectT.start_time,
                        selectT.end_time
                    );
                    setOneTrip(newTrip);
                } else {
                    console.log("Trip for driver not found");
                }
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <ProfileTop name="Your Schedule" />
                <Subtitle> Today: {today} </Subtitle>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={styles.placeholderInset}>
                        <PageTitle>{oneTrip?.school_name || 'Loading...'}</PageTitle>
                        <ExtraText>Transport Zone:{oneTrip?.zone || 'Loading...'}</ExtraText>
                        <Line></Line>
                        <StyledScheduleView>
                            <Ionicons name="bus-outline" size={30} color="black" />
                            <InnerScheduleView>
                                <NormText>Vehicle Plate: {oneTrip?.vehicle_number || 'Loading...'}</NormText>
                            </InnerScheduleView>
                        </StyledScheduleView>
                        <Line></Line>
                        <StyledScheduleView>
                            <Ionicons name="alarm-outline" size={30} color="black" />
                            <InnerScheduleView>
                                <NormText>{oneTrip?.start_time ? `Trip has started at: ${oneTrip.start_time}` : 'Trip has not started'}</NormText>
                            </InnerScheduleView>
                        </StyledScheduleView>
                        <Line></Line>
                        <StyledScheduleView>
                            <Ionicons name="log-out-outline" size={30} color="black" />
                            <InnerScheduleView>
                                <NormText>{oneTrip?.end_time ? `Trip has ended at: ${oneTrip.end_time}` : 'Trip has not ended'}</NormText>
                            </InnerScheduleView>
                        </StyledScheduleView>
                        <Line></Line>
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
                </ScrollView>
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