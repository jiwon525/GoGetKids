import React, { useState, useEffect } from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProfileTop from '../../src/components/ProfileTop';
import {
    StyledContainer, Colors, InnerContainer, NormText,
} from '../../src/components/styles';
import { useIsFocused } from '@react-navigation/native';
import { changeStatusDriver, changeStatusSchool, loadTrips, putTripStart } from '../../src/components/schema';
import { useUserSession } from '../../UserSessionContext';
import moment from 'moment';

const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const { userDetails, studentDetails, setStudentDetails, setTripDetails, tripDetails } = useUserSession();
    const [vehicleid, setVehicleID] = useState('');
    const isFocused = useIsFocused();
    const today = moment().format('YYYY-MM-DD');
    useEffect(() => {
        console.log("the trip array in scanscreen useEffect", tripDetails);
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);
    if (!hasPermission) {
        return (
            <StyledContainer>
                <InnerContainer>
                    <NormText>Please grant camera permissions to app.</NormText>
                </InnerContainer>
            </StyledContainer>
        );
    }
    const updateTrip = async () => {
        Alert.alert(
            "Confirm Action",
            "Do you want to start or end the trip?",
            [
                {
                    text: "Start Trip", onPress: async () => {
                        // Your logic to start the trip
                        console.log("Starting trip for vehicle ID:", vehicleid);
                        // Reset scanned state to allow for new scans
                        setScanned(false);
                    }
                },
                {
                    text: "End Trip", onPress: async () => {
                        // Your logic to end the trip
                        console.log("Ending trip for vehicle ID:", vehicleid);
                        // Reset scanned state to allow for new scans
                        setScanned(false);
                    }
                }
            ],
            { cancelable: true }
        );
    };

    const handleQRScanned = ({ type, data }) => {
        if (scanned) return; // Prevent multiple scans from triggering multiple alerts
        console.log("QR Code scanned");
        setScanned(true); // Prevent re-scanning until user makes a decision

        // Parse the QR data
        const parsedData = JSON.parse(data);
        const { vehicleId: scannedVehicleId } = parsedData;
        setVehicleID(scannedVehicleId); // Update vehicleId state

        updateTrip(); // Show alert to start or end trip
    };

    return (
        <StyledContainer>
            <ProfileTop name="Scan QR" />
            {isFocused ? (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleQRScanned}
                    style={styles.scanBox}
                />) : null}

        </StyledContainer>
    );
};
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scanBox: {
        height: deviceHeight * 0.8,
        width: deviceWidth,
    },
});

export default ScanScreen;