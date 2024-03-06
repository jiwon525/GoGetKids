import React, { useState, useEffect } from 'react';
import { Link, router } from 'expo-router';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProfileTop from '../../src/components/ProfileTop';
import {
    StyledContainer, Colors, InnerContainer, NormText,
} from '../../src/components/styles';
import { useIsFocused } from '@react-navigation/native';
import { changeStatusTeacher } from '../../src/components/schema';
import { useUserSession } from '../../UserSessionContext';

const ScanScreen = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const { userDetails, setStudentDetails, studentDetails } = useUserSession();
    const [scanned, setScanned] = useState(false);
    const isFocused = useIsFocused();
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);
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
                <InnerContainer>
                    <NormText>Please grant camera permissions to the app.</NormText>
                </InnerContainer>
            </StyledContainer>
        );
    }
    const updateStatus = async (vehicleid, studentid) => {
        console.log("Starting trip for vehicle ID:", vehicleid);
        changeStatusTeacher(vehicleid, studentid, userDetails.accessToken)
        await delay(1000); // Wait for 1 second (1000 milliseconds)
        showSuccess("Status updated");
        // Now fetch the updated trip and student data
        try {
            router.push("/teacher");
            // Reset scanned state to allow for new scans
            setScanned(false);
        } catch (error) {
            console.error("Error updating trip start:", error);
            // Handle error, e.g., show an alert
        }
    }


    //after scanning QR
    //teacher will scan qr of bus and guardian
    const handleQRScanned = ({ type, data }) => {
        if (scanned) return; // Prevent multiple scans from triggering multiple alerts
        setScanned(true); // Prevent re-scanning until user makes a decision
        // Parse the QR data
        const parsedData = JSON.parse(data);
        const { vehicleId = '', studentid = '', guardianName = '' } = parsedData;
        updateStatus(vehicleId, studentid);
    };

    return (
        <StyledContainer>
            <ProfileTop name="Scan QR" />
            {isFocused && (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleQRScanned}
                    style={styles.scanBox}
                />
            )}
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