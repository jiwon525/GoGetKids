import React, { useState, useEffect } from 'react';
import { Link, router } from 'expo-router';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProfileTop from '../../src/components/ProfileTop';
import {
    StyledContainer, Colors, InnerContainer,
} from '../../src/components/styles';

const ScanScreen = () => {
    const [hasPermission, setHasPermission] = React.useState(false);
    const [scanData, setScanData] = React.useState();

    useEffect(() => {
        setScanData(undefined);
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (!hasPermission) {
        return (
            <StyledContainer>
                <Text>Please grant camera permissions to app.</Text>
            </StyledContainer>
        );
    }
    //after scanning QR
    const handleQRScanned = ({ type, data }) => {
        setScanData(data);
        try {
            // Parse the JSON data
            const parsedData = JSON.parse(data);
            // Extract necessary information (e.g., scheduleid and studentid)
            const { id: scheduleid, studentid, guardianName } = parsedData;

            // Now you have scheduleid and studentid, you can use them as needed
            console.log('Schedule ID:', scheduleid);
            console.log('Student ID:', studentid);
            console.log('Guardian Name:', guardianName);
            //need to make a function to check for schedule id and student id to verify and then 
            //update the database for students to be 'out of school'
            //router.push("/")
            alert(`QR code with data schedule ID: ${scheduleid} and student ID: ${studentid} being picked up by guardian: ${guardianName} has been scanned!`);
            //empty data
        } catch (error) {
            console.error('Error parsing QR code data:', error);
            // Handle error (e.g., invalid QR code format)
            alert('Invalid QR code format!');
        }
    };

    return (
        <StyledContainer>
            <ProfileTop name="Scan QR" />
            <BarCodeScanner
                style={styles.scanBox}
                onBarCodeScanned={scanData ? undefined : handleQRScanned}
            />
        </StyledContainer>
    );
}
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