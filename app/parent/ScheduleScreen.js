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

const ScheduleScreen = () => {
    const params = useLocalSearchParams();
    const { studentid, accessToken } = params;
    const [schedule, setSchedule] = useState({
        _id: null,
        date: Date,
        firstName: '',
        lastName: '',
        school: '',
        studentclass: '',
        status: '',
        studentid: '',
        transporttype: '',
        pickuptime: null,
        dismissaltime: null,
    });
    const { studentDetails } = useUserSession();
    useEffect(() => {
        const fetchData = async () => {
            try {
                var id = parseInt(studentid);
                // Filter studentDetails array based on the provided studentID
                const selectedStudent = studentDetails.find(student => student.studentid === id);
                if (!selectedStudent) {
                    console.error('Error: Student not found');
                    return;
                }
                console.log(studentid);
                const s = await fetchSchedule(studentid, accessToken);
                console.log("from fetchschedule", s);
                const schedule = {
                    _id: s._id,
                    date: s.date,
                    firstName: selectedStudent.firstname,
                    lastName: selectedStudent.lastname,
                    school: selectedStudent.school_name,
                    studentclass: selectedStudent.class_name,
                    status: selectedStudent.status,
                    studentid: selectedStudent.studentid,
                    transporttype: s.transport_type,
                    pickuptime: s.pickup_time,
                    dismissaltime: s.dismissal_time,
                }
                console.log("schedule: ", schedule)
                setSchedule(schedule);
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
                            const us = await changeTransportType(schedule, accessToken);
                            const uschedule = {
                                _id: us._id,
                                date: us.date,
                                firstName: selectedStudent.firstname,
                                lastName: selectedStudent.lastname,
                                school: selectedStudent.school_name,
                                studentclass: selectedStudent.class_name,
                                status: selectedStudent.status,
                                studentid: selectedStudent.studentid,
                                transporttype: us.transport_type,
                                pickuptime: us.pickup_time,
                                dismissaltime: us.dismissal_time,
                            }
                            setSchedule(uschedule);
                        }
                    }
                ]
            );
        } catch (error) {
            console.error('Error changing transport type:', error);
        }
    };
    return (
        <StyledContainer>
            <ProfileTop name={schedule.date} />
            <View style={styles.placeholderInset}>
                <PageTitle>Today's Schedule</PageTitle>
                <Line></Line>
                <View style={styles.TopContainer}>
                    <StyledScheduleView>
                        <MostSmallLogo
                            resizeMode="contain" source={require('../../src/assets/student.png')} />
                        <InnerScheduleView>
                            <Subtitle>{schedule.firstName} {schedule.lastName}</Subtitle>
                            <ExtraText> - {schedule.studentid}</ExtraText>
                        </InnerScheduleView>
                    </StyledScheduleView>
                    <View style={styles.cardContainer}>
                        <CardTextStatus>Status : {schedule.status} </CardTextStatus>
                    </View>
                </View>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="ribbon-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>Class: {schedule.studentclass}</NormText>
                    </TextContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="school-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>{schedule.school}</NormText>
                    </TextContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="sunny-outline" size={30} color="black" />
                    <TextContainer>
                        {schedule.pickuptime === "Invalid" || !schedule.pickuptime ? (
                            <NormText>Parents Car to School!</NormText>
                        ) : (
                            <NormText>Morning pick up Time: {schedule.pickuptime}</NormText>
                        )}
                    </TextContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="moon-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>School dismissal Time: {schedule.dismissaltime}</NormText>
                    </TextContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="location-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>Transport type: {schedule.transporttype}</NormText>
                    </TextContainer>
                </StyledScheduleView>
            </View>
            {schedule.transporttype === 'Bus' && (
                <StyledButton onPress={handleChangeTransportType}>
                    <ButtonText>
                        Self PickUp
                    </ButtonText>
                </StyledButton>
            )}
            <Link href={{
                pathname: "/parent/AssignGuardian",
                params: {
                    scheduleid: schedule._id,
                    studentid: schedule.studentid
                }
            }} asChild>
                <StyledButton>
                    <ButtonText>
                        assign guardian to pickup
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