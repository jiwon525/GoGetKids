import React, { useEffect, useState } from 'react';
import { useUserSession } from '../../UserSessionContext';
import { StyleSheet, View, Dimensions } from "react-native";
import {
    StyledContainer, StyledButton, ButtonText, NormText, Line, Colors,
    ProfileContainer, BottomContainer, PageTitle, ExtraText, InnerContainer,
    StyledScheduleView, MostSmallLogo, InnerScheduleView, Subtitle, CardTextStatus, TextContainer,
} from '../components/styles';
import { Ionicons } from '@expo/vector-icons';
import ProfileTop from '../components/ProfileTop';
import { fetchSchedule } from '../components/schema';

const ScheduleScreen = ({ navigation }) => {
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
    console.log(studentDetails)
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (studentDetails && studentDetails.length > 0 && accessToken) {
                    const studentId = studentDetails[0].studentid;
                    const s = await fetchSchedule(studentDetails.studentid, accessToken);
                    const schedule = {
                        _id: s._id,
                        date: s.date,
                        firstName: studentDetails.firstname,
                        lastName: studentDetails.lastname,
                        school: studentDetails.school_name,
                        studentclass: studentDetails.class_name,
                        status: studentDetails.status,
                        studentid: studentId,
                        transporttype: s.transport_type,
                        pickuptime: s.pickup_time,
                        dismissaltime: s.dismissal_time,
                    }
                }
            } catch (error) {
                console.error('Error fetching schedule:', error);
            }
        };

        // Fetch data only if both studentDetails and accessToken are available and have changed
        if (studentDetails !== null && accessToken !== null) {
            fetchData();
        }
    }, [studentDetails]); // Run once
    return (
        <StyledContainer>
            <ProfileTop name={schedule.date} />
            <View style={styles.placeholderInset}>
                <PageTitle>Today's Schedule</PageTitle>
                <Line></Line>
                <View style={styles.TopContainer}>
                    <StyledScheduleView>
                        <MostSmallLogo
                            resizeMode="contain" source={require('../assets/student.png')} />
                        <InnerScheduleView>
                            <Subtitle>{schedule.firstName} {schedule.lastName}</Subtitle>
                            <ExtraText> - {schedule.studentid}</ExtraText>
                        </InnerScheduleView>
                    </StyledScheduleView>
                    <View style={styles.cardContainer}>
                        <CardTextStatus>{schedule.status} - {schedule.studentclass}</CardTextStatus>
                    </View>
                </View>
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
                        <NormText>Morning pick up Time: {schedule.pickuptime}</NormText>
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
            <StyledButton>
                <ButtonText>
                    Change transport type from bus to parent
                </ButtonText>
            </StyledButton>
            <StyledButton onPress={() => navigation.navigate("Assign")}>
                <ButtonText>
                    assign guardian to pickup
                </ButtonText>
            </StyledButton>
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