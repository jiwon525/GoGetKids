import React from 'react';
import {
    StyledContainer, StyledButton, ButtonText, NormText,
    ProfileContainer, BottomContainer,
} from '../components/styles';
import ProfileTop from '../components/ProfileTop';

const ChildScreen = () => {
    return (
        <StyledContainer>
            <ProfileTop />
            <NormText>Name: Rachel Yeo</NormText>
            <NormText>School: Methodist Primary School</NormText>
            <NormText>Class 1</NormText>
            <NormText>ID: S2301234</NormText>
            <NormText>Status: In School</NormText>
            <NormText>Pick Up Time for (Bus): 7: 45 AM</NormText>
            <NormText>Dismissal Time: 2:00 PM</NormText>
            <BottomContainer>
                <StyledButton>
                    <ButtonText>
                        Change Password
                    </ButtonText>
                </StyledButton>
                <StyledButton>
                    <ButtonText>
                        Log Out
                    </ButtonText>
                </StyledButton>
            </BottomContainer>


        </StyledContainer>
    );
};

export default ChildScreen;