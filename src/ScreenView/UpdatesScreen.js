//for parents to update schedule.transport_type to parents (cannot from parents to bus but can bus to parents)
//for parents to put in 3rd party email so that a guardian can help them pick up 

import React from 'react';
import { StyleSheet, View } from "react-native";
import {
    StyledContainer, StyledButton, ButtonText, NormText, Line,
    ProfileContainer, BottomContainer, PageTitle, ExtraText,
    StyledScheduleView,
} from '../components/styles';
import { Ionicons } from '@expo/vector-icons';
import ProfileTop from '../components/ProfileTop';
import Swiper from 'react-native-swiper';


const data = [
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
    },
    {
        id: 2,
        date: '12/1/2024',
        name: 'Chaim Yeo',
        school: 'Methodist Primary School',
        studentclass: 'Class 2',
        status: 'In School',
        studentid: 'S2301235',
        transporttype: 'Bus',
        pickuptime: '7:45 AM',
        dismissaltime: '2:00 PM',
    },
];


const ScheduleScreen = ({ }) => {

    return (
        <StyledContainer>
            <ProfileTop name="Updates" />
            <Swiper>
                {data.map((item, index) => (
                    <View key={index} style={styles.placeholderInset}>
                        <PageTitle>{item.name}</PageTitle>
                        <ExtraText>{item.date}</ExtraText>
                        <ExtraText>{item.school}</ExtraText>
                        <ExtraText>{item.status}</ExtraText>
                        <Line></Line>
                        <StyledScheduleView>
                            <Ionicons name="bus-outline" size={30} color="black" />
                            <StyledContainer>
                                <NormText>{item.pickuptime} - {item.dismissaltime}</NormText>
                            </StyledContainer>
                        </StyledScheduleView>
                        <Line></Line>
                        <StyledContainer>
                            <NormText>{item.studentid} {item.studentclass} {item.transporttype}</NormText>
                        </StyledContainer>
                        <StyledButton>
                            <ButtonText>
                                Change transport type from bus to parent
                            </ButtonText>
                        </StyledButton>
                        <StyledButton>
                            <ButtonText>
                                assign guardian to pickup
                            </ButtonText>
                        </StyledButton>
                    </View>
                ))}
            </Swiper>
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