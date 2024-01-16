import React from 'react';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab,
    Colors, BackIcon, AlignRow, InnerMidContainer, LoginLogo,
    StyledFormArea, LeftIcon, StyledButton, ButtonText, NormText,
    ProfileContainer, BottomContainer,
} from '../components/styles';
import ProfileTop from '../components/ProfileTop';


const HomeScreen = () => {
    return (
        <StyledContainer>
            <ProfileTop />
            <NormText>This is Homepage</NormText>

        </StyledContainer>

    );
};

export default HomeScreen;