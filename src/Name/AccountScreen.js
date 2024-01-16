import React from 'react';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab,
    Colors, BackIcon, AlignRow, InnerMidContainer, LoginLogo,
    StyledFormArea, LeftIcon, StyledButton, ButtonText, NormText,
    ProfileContainer, BottomContainer,
} from '../components/styles';
import ProfileTop from '../components/ProfileTop';

const AccountScreen = () => {
    return (
        <StyledContainer>
            <LoginTab>
                <ProfileTop />
                <ProfileContainer>
                    <LoginLogo resizeMode="contain" source={require('../assets/profile.png')} />
                </ProfileContainer>
            </LoginTab>

            <NormText>Name: Jiwon Jung</NormText>
            <NormText>Username: example@gmail.com</NormText>
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

export default AccountScreen;