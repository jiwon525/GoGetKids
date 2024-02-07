import React, { useEffect, useState } from 'react';
import {
    StyledContainer,
    InnerContainer,
    NormText,
} from '../components/styles';
import Card from '../components/Card';
import ProfileTop from '../components/ProfileTop';


const HomeScreen = ({ navigation }) => {
    const cardData = {
        firstname: 'Rachel',
        lastname: 'Yeo',
        status: 'In School',
        school: 'Methodist Primary School',
        grade: 'Class 1',
        studentID: 'S2301234',
    };
    const cardData2 = {
        firstname: 'test',
        lastname: 'test',
        status: 'In School',
        school: 'Morning Primary School',
        grade: 'Class 2',
        studentID: 'S2223348',
    }
    return (
        <StyledContainer>
            <ProfileTop name="Home" />
            <InnerContainer>
                <Card {...cardData} onPress={() => navigation.navigate("Child")}></Card>
                <Card {...cardData2} onPress={() => navigation.navigate("Child")}></Card>
            </InnerContainer>
        </StyledContainer>
    );
};

export default HomeScreen;
