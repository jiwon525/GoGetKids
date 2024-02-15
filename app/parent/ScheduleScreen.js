import React, { useEffect, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { useUserSession } from '../../UserSessionContext';
import { StyleSheet, View, Dimensions, Alert } from "react-native";
import {
    StyledContainer, StyledButton, ButtonText, NormText, Line, Colors,
    ProfileContainer, BottomContainer, PageTitle, ExtraText, InnerContainer,
    StyledScheduleView, MostSmallLogo, InnerScheduleView, Subtitle, CardTextStatus, TextContainer,
} from '../../src/components/styles';
import { Ionicons } from '@expo/vector-icons';
import ProfileTop from '../../src/components/ProfileTop';
import { fetchSchedule, changeTransportType } from '../../src/components/schema';
import ScheduleDetails from '../../src/components/ScheduleDetails';
const ScheduleScreen = () => {
    const params = useLocalSearchParams();
    const { studentid, accessToken } = params;
    const [oneSchedule, setOneSchedule] = useState(ScheduleDetails);
    const { studentDetails, scheduleDetails } = useUserSession();
    useEffect(() => {
        const fetchData = async () => {
            try {
                var id = parseInt(studentid);
                const selectedStudent = studentDetails.find(student => student.studentid === id);
                if (!selectedStudent) {
                    console.error('Error: Student not found');
                    return;
                }
                console.log(studentid);
                const studentSchedule = scheduleDetails.filter(schedule => schedule.studentid === selectedStudent.studentid);
                console.log("Schedule for student", studentSchedule);
                setOneSchedule(studentSchedule);
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };
        fetchData();
    }, []);
    const handleChangeTransportType = async () => {
        try {
            Alert.alert(
                "Confirm",
                "Are you sure you want to change the transport type to self pick up?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: async () => {
                            // Call changeTransportType function to change transport type
                            const us = await changeTransportType(studentSchedule._id, accessToken);
                            const updatedTransportType = us.transport_type;
                            const updatedScheduleDetails = {
                                ...studentSchedule,
                                transporttype: updatedTransportType
                            };
                            await setScheduleDetails(updatedScheduleDetails);
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert(
                "Error!",
                "Unable to update transport type",
                [
                    {
                        text: "Ok",
                        style: "cancel"
                    }
                ]
            )
        }
    };
    return (
        <StyledContainer>
            <ProfileTop name={studentSchedule.date} />
            <View style={styles.placeholderInset}>
                <PageTitle>Today's Schedule</PageTitle>
                <Line></Line>
                <View style={styles.TopContainer}>
                    <StyledScheduleView>
                        <MostSmallLogo
                            resizeMode="contain" source={require('../../src/assets/student.png')} />
                        <InnerScheduleView>
                            <Subtitle>{studentSchedule.firstName} {studentSchedule.lastName}</Subtitle>
                            <ExtraText> - {studentSchedule.studentid}</ExtraText>
                        </InnerScheduleView>
                    </StyledScheduleView>
                    <View style={styles.cardContainer}>
                        <CardTextStatus>Status : {studentSchedule.status} </CardTextStatus>
                    </View>
                </View>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="ribbon-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>Class: {studentSchedule.studentclass}</NormText>
                    </TextContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="school-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>{studentSchedule.school}</NormText>
                    </TextContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="sunny-outline" size={30} color="black" />
                    <TextContainer>
                        {studentSchedule.pickuptime === "Invalid" || !studentSchedule.pickuptime ? (
                            <NormText>Parents Car to School!</NormText>
                        ) : (
                            <NormText>Morning pick up Time: {studentSchedule.pickuptime}</NormText>
                        )}
                    </TextContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="moon-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>School dismissal Time: {studentSchedule.dismissaltime}</NormText>
                    </TextContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="location-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>Transport type: {studentSchedule.transporttype}</NormText>
                    </TextContainer>
                </StyledScheduleView>
            </View>
            {studentSchedule.transporttype === 'Bus' && (
                <StyledButton onPress={handleChangeTransportType}>
                    <ButtonText>
                        Self PickUp
                    </ButtonText>
                </StyledButton>
            )}
            <Link href={{
                pathname: "/parent/AssignGuardian",
                params: {
                    scheduleid: studentSchedule._id,
                    studentid: studentSchedule.studentid
                }
            }} asChild>
                <StyledButton>
                    <ButtonText>
                        Assign guardian to pickup
                    </ButtonText>
                </StyledButton>
            </Link>
        </StyledContainer>
    );
};
const deviceWidth = Dimensions.get('window').width
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
    TopContainer: {
        width: deviceWidth,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: Colors.bgrey,
    }
});

export default ScheduleScreen;