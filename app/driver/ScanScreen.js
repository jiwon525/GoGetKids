import React, { useState, useEffect } from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProfileTop from '../../src/components/ProfileTop';
import {
    StyledContainer, Colors, InnerContainer, NormText,
} from '../../src/components/styles';
import { useIsFocused } from '@react-navigation/native';
import { changeStatusDriver, changeStatusSchool, loadTrips, putTripStart, putTripEnd } from '../../src/components/schema';
import { useUserSession } from '../../UserSessionContext';
import moment from 'moment';

const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const { userDetails, studentDetails, setStudentDetails, setTripDetails, tripDetails } = useUserSession();
    const isFocused = useIsFocused();
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const today = moment().format('YYYY-MM-DD');
    const showSuccess = (errMsg) =>
        Alert.alert('Successful', errMsg, [
            {
                cancelable: true,
                text: 'OK', onPress: async () => {
                    setScanned(false)
                }
            },
        ]);
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
    const updateTrip = async (vehicleid) => {
        Alert.alert(
            "Confirm Action",
            "Do you want to start or end the trip?",
            [
                {
                    text: "Start Trip", onPress: async () => {
                        // Your logic to start the trip
                        console.log("Starting trip for vehicle ID:", vehicleid);
                        putTripStart(vehicleid, userDetails.email, today, userDetails.accessToken)
                        await delay(1000); // Wait for 1 second (1000 milliseconds)
                        showSuccess("Status updated");
                        // Now fetch the updated trip and student data
                        try {
                            const { tripArray, studentArray } = await loadTrips(userDetails.email, userDetails.accessToken);
                            console.log("inside the driver scan array", tripArray);
                            setTripDetails(tripArray);
                            setStudentDetails(studentArray);
                            router.push("/driver");
                            // Reset scanned state to allow for new scans
                            setScanned(false);
                        } catch (error) {
                            console.error("Error updating trip start:", error);
                            // Handle error, e.g., show an alert
                        }
                    }
                },
                {
                    text: "End Trip", onPress: async () => {
                        // Your logic to end the trip
                        console.log("Ending trip for vehicle ID:", vehicleid);
                        putTripEnd(vehicleid, userDetails.email, today, userDetails.accessToken)
                        await delay(1000); // Wait for 1 second (1000 milliseconds)
                        showSuccess("Status updated");
                        // Now fetch the updated trip and student data
                        try {
                            const { tripArray, studentArray } = await loadTrips(userDetails.email, userDetails.accessToken);
                            console.log("inside the driver trip array", tripArray);
                            setTripDetails(tripArray);
                            setStudentDetails(studentArray);
                            router.push("/driver");
                            // Reset scanned state to allow for new scans
                            setScanned(false);
                        } catch (error) {
                            console.error("Error updating trip end:", error);
                            // Handle error
                        }
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
        console.log("vehicle id is read", scannedVehicleId);
        updateTrip(scannedVehicleId); // Show alert to start or end trip
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