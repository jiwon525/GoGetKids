import React from 'react';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab,
    Colors, BackIcon, AlignRow, InnerMidContainer, LoginLogo,
    StyledFormArea, LeftIcon, StyledButton, ButtonText, NormText,
    ProfileContainer, BottomContainer,
} from '../components/styles';
import ProfileTop from '../components/ProfileTop';
import Card from '../components/Card';

const HomeScreen = () => {
    return (
        <StyledContainer>
            <ProfileTop />
            <InnerContainer>
                <NormText>This is Homepage</NormText>
                <Card />
                <Card />
            </InnerContainer>
        </StyledContainer>

    );
};

export default HomeScreen;