import React from 'react';
import {
    StyledContainer, StyledButton, ButtonText, NormText,
    ProfileContainer, BottomContainer,
} from '../components/styles';
import ProfileTop from '../components/ProfileTop';
import SwipeCard from '../components/SwipeCard';

const ChildScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <ProfileTop name="My Loved Ones" />

            <SwipeCard></SwipeCard>

        </StyledContainer>
    );
};

export default ChildScreen;