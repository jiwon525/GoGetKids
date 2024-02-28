import React, { useState, useEffect } from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProfileTop from '../../src/components/ProfileTop';
import {
    StyledContainer, Colors, InnerContainer,
} from '../../src/components/styles';
import { useIsFocused } from '@react-navigation/native';
import { changeStatusDriver, changeStatusSchool, loadTrips, putTripStart } from '../../src/components/schema';
import { useUserSession } from '../../UserSessionContext';
import moment from 'moment';

const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const { userDetails, studentDetails, setStudentDetails, setTripDetails, tripDetails } = useUserSession();
    console.log(hasPermission, scanned);
    const isFocused = useIsFocused();
    const today = moment().format('YYYY-MM-DD');
    useEffect(() => {
        console.log("the trip array in scanscreen useEffect", tripDetails);
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);
    const showAlert = (errMsg) =>
        Alert.alert('Unable to Scan', errMsg, [
            {
                cancelable: true,
                text: 'Try again',
            },
        ]);
    const showSuccess = (errMsg) =>
        Alert.alert('Successful', errMsg, [
            {
                cancelable: true,
                text: 'OK', onPress: async () => {
                    setScanned(false)
                }
            },
        ]);
    if (!hasPermission) {
        return (
            <StyledContainer>
                <Text>Please grant camera permissions to app.</Text>
            </StyledContainer>
        );
    }
    //after scanning QR
    //parent will scan either bus or school
    const handleQRScanned = ({ type, data }) => {
        console.log("handleQR scanned")
        setScanned(false);
        // Parse the JSON data
        // Extract necessary information
        const parsedData = JSON.parse(data);
        const { id: id, vehicleId = '' } = parsedData;
        Alert.alert(
            "Confirm",
            "Trip Start? End?",
            [
                {
                    text: "Trip Start", onPress: async (vehicleId) => {
                        console.log("the trip array in scanscreen", tripDetails);
                        try {
                            putTripStart(vehicleId, userDetails.email, today, userDetails.accessToken)
                            showSuccess("Status updated");
                            const { tripArray, studentArray } = await loadTrips(userDetails.email, userDetails.accessToken);
                            console.log("inside the driver trip array", tripArray);
                            setTripDetails(tripArray);
                            setStudentDetails(studentArray);
                            router.push("/driver");
                        } catch (error) {
                            showAlert("changeStatus does not work");
                        }
                    }
                },
                {
                    text: "Trip End", onPress: async (vehicleId) => {
                        console.log("the trip array in scanscreen", tripDetails);
                        try {
                            putTripEnd(vehicleId, userDetails.email, today, userDetails.accessToken)
                            showSuccess("Status updated");
                            const { tripArray, studentArray } = await loadTrips(userDetails.email, userDetails.accessToken);
                            console.log("inside the driver trip array", tripArray);
                            setTripDetails(tripArray);
                            setStudentDetails(studentArray);
                            router.push("/driver");
                        } catch (error) {
                            showAlert("changeStatus does not work");
                        }
                    }
                }
            ]
        );
    };
    return (
        <StyledContainer>
            <ProfileTop name="Scan QR" />
            {
                isFocused ? (
                    <BarCodeScanner
                        onBarCodeScanned={scanned ? undefined : handleQRScanned}
                        style={styles.scanBox}
                    />) : null
            }

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