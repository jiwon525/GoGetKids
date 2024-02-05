import React from 'react';
import {
    StyledContainer,
    InnerContainer,
    NormText,
} from '../components/styles';
import Card from '../components/Card';
import ProfileTop from '../components/ProfileTop';


const HomeScreen = ({ navigation }) => {

    const navigateToChildScreen = () => {
        navigation.navigate('Child');
    };
    const cardData = {
        name: 'Rachel Yeo',
        status: 'In School',
        school: 'Methodist Primary School',
        grade: 'Class 1',
        studentID: 'S2301234',
    };
    const cardData2 = {
        name: 'Testing 2',
        status: 'In School',
        school: 'Morning Primary School',
        grade: 'Class 2',
        studentID: 'S2223348',
    }
    return (
        <StyledContainer>
            <ProfileTop name="Home" />
            <InnerContainer>
                <Card {...cardData} onPress={navigateToChildScreen}></Card>
                <Card {...cardData2} onPress={navigateToChildScreen}></Card>
            </InnerContainer>
        </StyledContainer>
    );
};

export default HomeScreen;
