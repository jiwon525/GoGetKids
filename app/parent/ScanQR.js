import React, { useState, useEffect } from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProfileTop from '../../src/components/ProfileTop';
import {
    StyledContainer, Colors, InnerContainer, NormText,
} from '../../src/components/styles';
import { useIsFocused } from '@react-navigation/native';
import { changeStatusDriver, changeStatusSchool, loadStudents } from '../../src/components/schema';
import { useUserSession } from '../../UserSessionContext';

const ScanQR = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const { userDetails, studentDetails, setStudentDetails, setScheduleDetails } = useUserSession();
    const params = useLocalSearchParams();
    const { studentid } = params;
    const [currentStudent, setCurrentStudent] = useState();
    console.log(hasPermission, scanned);
    const isFocused = useIsFocused();


    useEffect(() => {
        var id = parseInt(studentid);
        const selectedStudent = studentDetails.find(student => student.studentid === id);
        if (!selectedStudent) {
            console.error('Error: Student not found');
            router.push("/parent/ScanScreen");
        }
        setCurrentStudent(selectedStudent);
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
    const updateStudent = async (vehicleid, schoolname) => {
        try {
            console.log("inside if condition", vehicleid, schoolname);
            if (!vehicleid) {
                changeStatusSchool(currentStudent.studentid, schoolname, userDetails.accessToken);
            } else if (!schoolname) {
                changeStatusDriver(currentStudent.studentid, vehicleid, userDetails.accessToken);
            }
            showSuccess("Status updated");
            const { studentDetailsArray, resolvedSchedules } = await loadStudents(userDetails.email, userDetails.accessToken);
            setStudentDetails(studentDetailsArray);
            setScheduleDetails(resolvedSchedules.flat());
            router.push("/parent/ScanScreen");
        } catch (error) {
            showAlert("changeStatus does not work");
        }
    }

    //after scanning QR
    //parent will scan either bus or school
    const handleQRScanned = ({ type, data }) => {
        console.log("handleQR scanned")
        setScanned(false);
        // Parse the JSON data
        // Extract necessary information
        const parsedData = JSON.parse(data);
        const { id: id, vehicleId = '', schoolName = '' } = parsedData;
        updateStudent(vehicleId, schoolName);
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

export default ScanQR;