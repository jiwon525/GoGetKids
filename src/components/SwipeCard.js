/*import React from "react";
import { StyleSheet, View } from "react-native";
import ionicons
import SwipeableCard from 'react-native-swipeable-cards';
import { PageTitle, Line, StyledScheduleView, NormText, StyledContainer, ExtraText } from '../components/styles';

const SwipeableCardContainer = () => {
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

    return (
        <SwipeableCard
            cards={data}
            renderCard={(cardData) => <SwipeCard {...cardData} />}
            keyExtractor={(cardData) => cardData.id.toString()}
        />
    );
};

const SwipeCard = ({ date, name, school, studentclass, status, studentid, transporttype, pickuptime, dismissaltime }) => {
    return (
        <View style={styles.placeholderInset}>
            <PageTitle>{name}</PageTitle>
            <ExtraText>{date}</ExtraText>
            <ExtraText>{school}</ExtraText>
            <ExtraText>{status}</ExtraText>
            <Line></Line>
            <StyledScheduleView>
                <Ionicons name="bus-outline" size={30} color="black" />
                <StyledContainer>
                    <NormText>{pickuptime} - {dismissaltime}</NormText>
                </StyledContainer>
            </StyledScheduleView>
            <Line></Line>
            <StyledContainer>
                <NormText>{studentid} {studentclass} {transporttype}</NormText>
            </StyledContainer>
        </View>
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

export default SwipeableCardContainer;
*/