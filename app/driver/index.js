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
                    fetchedTrip.date,
                    fetchedTrip.vehicle_number,
                    fetchedTrip.vehicle_type,
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
                <View style={styles.picker}>{daysOfWeek}</View>
                <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 5 }}>
                    <Subtitle>{value.toDateString()}</Subtitle>
                    <View style={styles.placeholder}>
                        <TripSheet
                            school={tripDetails.school_name}
                            zone={tripDetails.zone}
                            vehiclenum={tripDetails.vehicle_number}
                            DATA={DATA}
                        />
                    </View>
                </View>
            </StyledContainer>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
    header: {
        paddingTop: 14,
        backgroundColor: Colors.primary,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 12,
    },
    picker: {
        flex: 1,
        maxHeight: 74,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footer: {
        marginTop: 'auto',
        paddingHorizontal: 16,
    },
    /** Item */
    item: {
        flex: 1,
        height: 50,
        marginHorizontal: 4,
        paddingVertical: 6,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#e3e3e3',
        flexDirection: 'column',
        alignItems: 'center',
    },
    itemRow: {
        width: width,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginHorizontal: -4,
    },
    itemWeekday: {
        fontSize: 13,
        fontWeight: '500',
        color: '#737373',
    },
    itemDate: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
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
    placeholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
});
export default TripScreen;