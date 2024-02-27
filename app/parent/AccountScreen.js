import React, { useEffect } from 'react';
import { Link, router } from 'expo-router';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab, LoginTitle,
    Colors, BackIcon, AlignRow, InnerMidContainer, LoginLogo,
    StyledFormArea, LeftIcon, StyledButton, ButtonText, NormText,
    ProfileContainer, BottomContainer, Account,
} from '../../src/components/styles';
import ProfileTop from '../../src/components/ProfileTop';
import { StyleSheet, View, Text } from "react-native";
import { useUserSession } from '../../UserSessionContext';
//check if account sch name is null and show accordingly

const AccountScreen = () => {
    const { userDetails } = useUserSession();
    return (
        <StyledContainer>
            <LoginTab>
                <ProfileTop name="My Account" />
                <ProfileContainer>
                    <LoginLogo resizeMode="contain" source={require('../../src/assets/profile.png')} />
                </ProfileContainer>
            </LoginTab>
            <View style={styles.placeholderInset}>
                <View style={styles.textContainer}>
                    <AlignRow>
                        <LoginTitle>Name:</LoginTitle>
                        <Account> {userDetails.firstName} {userDetails.lastName}</Account>
                    </AlignRow>
                    <AlignRow>
                        <LoginTitle>Email:</LoginTitle>
                        <Account> {userDetails.email}</Account>
                    </AlignRow>
                    <AlignRow>
                        <LoginTitle>Role:</LoginTitle>
                        <Account> {userDetails.role}</Account>
                    </AlignRow>

                </View>
            </View>
            <StyledButton onPress={() => router.push("/parent/ChangePasswordScreen")}>
                <ButtonText>
                    Change Password
                </ButtonText>
            </StyledButton>
            <StyledButton onPress={() => router.replace("/")}>
                <ButtonText>
                    Log Out
                </ButtonText>
            </StyledButton>

        </StyledContainer>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    labelText: {
        fontSize: 16,
        color: Colors.dark,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    valueText: {
        fontSize: 18,
        color: Colors.night,
        marginBottom: 15,
    },
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





export default AccountScreen;