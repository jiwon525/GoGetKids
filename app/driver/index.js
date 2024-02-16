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
    Colors, Subtitle,
} from '../../src/components/styles';
import TripSheet from '../../src/components/TripSheet';
import ProfileTop from '../../src/components/ProfileTop';
import { fetchDriverTrips } from '../../src/components/schema';
import TripDetails from '../../src/components/TripDetails';
import { ScrollView } from 'react-native-gesture-handler';

const TripScreen = () => {
    const { userDetails, tripDetails, setTripDetails } = useUserSession();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedTrip = await fetchDriverTrips(userDetails.email, userDetails.accessToken);
                const userD = new TripDetails(
                    fetchedTrip._id,
                    fetchedTrip.vehicle_number,
                    fetchedTrip.driver_email,
                    fetchedTrip.company_name,
                    fetchedTrip.school_name,
                    fetchedTrip.zone,
                    fetchedTrip.start_time,
                    fetchedTrip.end_time,
                );
                setTripDetails(userD);
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
                        <PageTitle>{school}</PageTitle>
                        <ExtraText>{zone}</ExtraText>
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
                        </StyledContainer>
                        <FlatList
                            data={DATA}
                            renderItem={({ item }) => <Item address={item.address} postalcode={item.postalcode} name={item.name} />}
                            keyExtractor={item => item.id}
                        />
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