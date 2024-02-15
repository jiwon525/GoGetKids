import React, { useEffect } from 'react';
import { Link, router } from 'expo-router';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab, LoginTitle,
    Colors, BackIcon, AlignRow, InnerMidContainer, LoginLogo,
    StyledFormArea, LeftIcon, StyledButton, ButtonText, NormText,
    ProfileContainer, BottomContainer,
} from '../../src/components/styles';
import ProfileTop from '../../src/components/ProfileTop';
import { StyleSheet, View, Text } from "react-native";

//check if account sch name is null and show accordingly

const AccountScreen = () => {

    return (
        <StyledContainer>
            <LoginTab>
                <ProfileTop name="My Account" />

                <ProfileContainer>
                    <LoginLogo resizeMode="contain" source={require('../../src/assets/profile.png')} />
                </ProfileContainer>
            </LoginTab>
            <View style={styles.textContainer}>
                <LoginTitle>Name</LoginTitle>
                <NormText>Jiwon Jung</NormText>
                <LoginTitle>Username</LoginTitle>
                <NormText>hello@gmail.com</NormText>
            </View>
            <BottomContainer>
                <StyledButton onPress={() => router.push("/driver/ChangePasswordScreen")}>
                    <ButtonText>
                        Change Password
                    </ButtonText>
                </StyledButton>
                <StyledButton onPress={() => router.replace("/")}>
                    <ButtonText>
                        Log Out
                    </ButtonText>
                </StyledButton>
            </BottomContainer>
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
});





export default AccountScreen;