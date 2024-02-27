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
import moment from 'moment';
import { fetchSchedule, changeTransportType } from '../../src/components/schema';
import ScheduleDetails from '../../src/components/ScheduleDetails';
const ScheduleScreen = () => {
    const params = useLocalSearchParams();
    const { studentid, accessToken } = params;
    const [oneSchedule, setOneSchedule] = useState({});
    const { studentDetails, scheduleDetails, setScheduleDetails } = useUserSession();
    useEffect(() => {
        const fetchData = async () => {
            try {
                var id = parseInt(studentid);
                const selectedStudent = studentDetails.find(student => student.studentid === id);
                if (!selectedStudent) {
                    console.error('Error: Student not found');
                    return;
                }
                const today = moment().format('YYYY-MM-DD');
                console.log("today is: ", today);
                const selectS = scheduleDetails.find(schedule => schedule.studentid === selectedStudent.studentid && schedule.date === today);
                if (selectS) {
                    const newSchedule = new ScheduleDetails(
                        selectS._id,
                        selectS.date,
                        selectS.firstName,
                        selectS.lastName,
                        selectS.school,
                        selectS.studentclass,
                        selectS.status,
                        selectS.studentid,
                        selectS.transporttype,
                        selectS.pickuptime,
                        selectS.dismissaltime
                    );
                    setOneSchedule(newSchedule);

                } else {
                    console.log("Schedule for student not found");
                }
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };
        fetchData();
    }, [studentid]);
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
                            try {
                                const updatedSchedule = await changeTransportType(oneSchedule._id, accessToken);
                                if (updatedSchedule) {
                                    const newScheduleDetails = scheduleDetails.map(schedule => {
                                        if (schedule._id === updatedSchedule._id) {
                                            // Update the schedule with new data from the server
                                            return {
                                                ...schedule,
                                                school_name: updatedSchedule.school_name,
                                                transport_type: updatedSchedule.transport_type,
                                                pickup_time: updatedSchedule.pickup_time,
                                                dismissal_time: updatedSchedule.dismissal_time
                                            };
                                        }
                                        return schedule; // Return unmodified for other schedules
                                    });

                                    // Update the session with the new array of schedule details
                                    setScheduleDetails(newScheduleDetails);

                                    // Update the state for the current schedule being displayed
                                    const uSchedule = new ScheduleDetails(
                                        updatedSchedule._id,
                                        updatedSchedule.date,
                                        oneSchedule.firstName,
                                        oneSchedule.lastName,
                                        updatedSchedule.school_name,
                                        oneSchedule.studentclass,
                                        oneSchedule.status,
                                        updatedSchedule.studentid,
                                        updatedSchedule.transport_type,
                                        updatedSchedule.pickup_time,
                                        updatedSchedule.dismissal_time
                                    );
                                    setOneSchedule(uSchedule);
                                } else {
                                    console.log("Schedule for student not found");
                                }
                            } catch (error) {
                                console.error("Unable to update transport type", error);
                                Alert.alert("Error!", "Unable to update transport type");
                            }
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
    const isScheduleEmpty = Object.keys(oneSchedule).length === 0;
    return (
        <StyledContainer>
            <ProfileTop name={oneSchedule.date || "Schedule"} />
            {/* Conditional rendering based on if the schedule is empty */}
            {isScheduleEmpty ? (
                <View style={styles.placeholderInset}>
                    <PageTitle>Schedule Not Loaded Yet</PageTitle>
                </View>
            ) : (
                <View style={styles.placeholderInset}>
                    <PageTitle>Today's Schedule</PageTitle>
                    <Line></Line>
                    <View style={styles.TopContainer}>
                        <StyledScheduleView>
                            <MostSmallLogo
                                resizeMode="contain" source={require('../../src/assets/student.png')} />
                            <InnerScheduleView>
                                <Subtitle>{oneSchedule.firstName} {oneSchedule.lastName}</Subtitle>
                                <ExtraText> - {oneSchedule.studentid}</ExtraText>
                            </InnerScheduleView>
                        </StyledScheduleView>
                        <View style={styles.cardContainer}>
                            <CardTextStatus>Status : {oneSchedule.status} </CardTextStatus>
                        </View>
                    </View>
                    <Line></Line>
                    <StyledScheduleView>
                        <Ionicons name="ribbon-outline" size={30} color="black" />
                        <TextContainer>
                            <NormText>Class: {oneSchedule.studentclass}</NormText>
                        </TextContainer>
                    </StyledScheduleView>
                    <Line></Line>
                    <StyledScheduleView>
                        <Ionicons name="school-outline" size={30} color="black" />
                        <TextContainer>
                            <NormText>{oneSchedule.school}</NormText>
                        </TextContainer>
                    </StyledScheduleView>
                    <Line></Line>
                    <StyledScheduleView>
                        <Ionicons name="sunny-outline" size={30} color="black" />
                        <TextContainer>
                            {oneSchedule.pickuptime === "Invalid" || !oneSchedule.pickuptime || oneSchedule.transporttype === "Parent" ? (
                                <NormText>Parents Car to School!</NormText>
                            ) : (
                                <NormText>Morning pick up Time: {oneSchedule.pickuptime}</NormText>
                            )}
                        </TextContainer>
                    </StyledScheduleView>
                    <Line></Line>
                    <StyledScheduleView>
                        <Ionicons name="moon-outline" size={30} color="black" />
                        <TextContainer>
                            <NormText>School dismissal Time: {oneSchedule.dismissaltime}</NormText>
                        </TextContainer>
                    </StyledScheduleView>
                    <Line></Line>
                    <StyledScheduleView>
                        <Ionicons name="location-outline" size={30} color="black" />
                        <TextContainer>
                            <NormText>Transport type: {oneSchedule.transporttype}</NormText>
                        </TextContainer>
                    </StyledScheduleView>
                </View>
            )}
            {oneSchedule.transporttype === 'Bus' && (
                <StyledButton onPress={handleChangeTransportType}>
                    <ButtonText>
                        Self PickUp
                    </ButtonText>
                </StyledButton>
            )}
            <Link href={{
                pathname: "/parent/AssignGuardian",
                params: {
                    scheduleid: oneSchedule._id,
                    studentid: oneSchedule.studentid
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