import React from 'react';
import { StyleSheet, View } from "react-native";
import {
    StyledContainer, StyledButton, ButtonText, NormText, Line,
    ProfileContainer, BottomContainer, PageTitle, ExtraText,
    StyledScheduleView,
} from '../components/styles';
import { Ionicons } from '@expo/vector-icons';
import ProfileTop from '../components/ProfileTop';

const data =
{
    id: 1,
    date: '12/1/2024',
    name: 'Rachel Yeo',
    school: 'Methodist Primary School',
    studentclass: 'Class 1',
    status: 'In School',
    studentid: 'S2301234',
    transporttype: 'Bus',
    pickuptime: '7:45 AM',
    dismissaltime: '2:00 PM',
};


const ScheduleScreen = ({ }) => {

    return (
        <StyledContainer>
            <ProfileTop name="Today's Schedule" />
            <View style={styles.placeholderInset}>
                <PageTitle>{data.name}</PageTitle>
                <ExtraText>{data.date}</ExtraText>
                <ExtraText>{data.school}</ExtraText>
                <ExtraText>{data.status}</ExtraText>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="bus-outline" size={30} color="black" />
                    <StyledContainer>
                        <NormText>{data.pickuptime} - {data.dismissaltime}</NormText>
                    </StyledContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledContainer>
                    <NormText>{data.studentid} {data.studentclass} {data.transporttype}</NormText>
                </StyledContainer>
            </View>

        </StyledContainer>
    );
};

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
});

export default ScheduleScreen;