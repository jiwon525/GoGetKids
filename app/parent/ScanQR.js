import React, { useState, useEffect } from 'react';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { Text, View, StyleSheet, Button, Dimensions, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProfileTop from '../../src/components/ProfileTop';
import {
    StyledContainer, Colors, InnerContainer,
} from '../../src/components/styles';
import { changeStatusSchool, loadStudents } from '../../src/components/schema';
import { useUserSession } from '../../UserSessionContext';

const ScanQR = () => {
    const [hasPermission, setHasPermission] = React.useState(false);
    const [scanData, setScanData] = React.useState(undefined);
    const { userDetails, studentDetails, setStudentDetails, setScheduleDetails } = useUserSession();
    const params = useLocalSearchParams();
    const { studentid } = params;
    const [currentStudent, setCurrentStudent] = useState();
    useEffect(() => {
        setScanData(undefined);
        try {
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
        } catch (error) {
            showAlert("student does not exist")
        }
    }, [scanData]);
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
                text: 'OK',
            },
        ]);
    if (!hasPermission) {
        return (
            <StyledContainer>
                <Text>Please grant camera permissions to app.</Text>
            </StyledContainer>
        );
    }
    const updateStudent = async () => {
        const { studentDetailsArray, resolvedSchedules } = await loadStudents(userDetails.email, userDetails.accessToken);
        setStudentDetails(studentDetailsArray);
        //console.log("Schedules for all students: ", resolvedSchedules.flat()); // Use .flat() to flatten the array of arrays
        setScheduleDetails(resolvedSchedules.flat());
    }
    //after scanning QR
    //parent will scan either bus or school
    const handleQRScanned = ({ type, data }) => {
        setScanData(data);
        try {
            // Parse the JSON data
            const parsedData = JSON.parse(data);
            // Extract necessary information (e.g., scheduleid and studentid)
            const { id: id, vehicleId = '', schoolName = '' } = parsedData;
            //
            alert(`QR code with data: ${vehicleId} ${schoolName} has been scanned!`);
            if (!vehicleId) {
                //run function to find school & change status
                try {
                    changeStatusSchool(currentStudent.studentid, schoolName, userDetails.accessToken);
                    showSuccess("Status updated")
                    setTimeout(() => setScanData(undefined), 2000);
                    updateStudent();
                    router.push("/parent/ScanScreen");
                } catch (error) {
                    showAlert("changeStatus does not work");
                }

            } else {
                //run function to find vehicleid & change status
                setTimeout(() => setScanData(undefined), 2000);
            }
            //setScanData(undefined);
            //router.push("/parent")
            //empty data
        } catch (error) {
            console.error('Error parsing QR code data:', error);
            // Handle error (e.g., invalid QR code format)
            alert('Invalid QR code format!');
            setScanData(undefined);
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

export default ScanQR;