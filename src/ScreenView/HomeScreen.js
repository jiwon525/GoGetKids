import React from 'react';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab,
    Colors, BackIcon, AlignRow, InnerMidContainer, LoginLogo,
    StyledFormArea, LeftIcon, StyledButton, ButtonText, NormText,
    ProfileContainer, BottomContainer,
} from '../components/styles';
import ProfileTop from '../components/ProfileTop';
import Card from '../components/Card';

const HomeScreen = ({ navigation }) => {
    const navigateToChildScreen = () => {
        navigation.navigate("Child");
    };
    //some sort of loop that checks that theres no more 
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
            <ProfileTop name="Home" navigation={navigation} />
            <InnerContainer>
                <Card {...cardData} onPress={navigateToChildScreen}></Card>
                <Card {...cardData2} onPress={navigateToChildScreen}></Card>
            </InnerContainer>
        </StyledContainer>
    );
};

export default HomeScreen;


/*
const ClassCard = ({ name, school, status, class, id }) => {
    return (
        <View>
            <LeftIcon>
                <Octicons name={icon} size={30} color="black" />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.darkLight} />
                </RightIcon>
            )}
        </View>
    );
};
*/