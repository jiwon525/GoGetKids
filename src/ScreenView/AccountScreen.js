import React from 'react';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab, LoginTitle,
    Colors, BackIcon, AlignRow, InnerMidContainer, LoginLogo,
    StyledFormArea, LeftIcon, StyledButton, ButtonText, NormText,
    ProfileContainer, BottomContainer,
} from '../components/styles';
import ProfileTop from '../components/ProfileTop';
import { StyleSheet, View, Text } from "react-native";

const AccountScreen = ({ navigation }) => {
    return (
        <StyledContainer>
            <LoginTab>
                <ProfileTop name="My Account" navigation={navigation} />

                <ProfileContainer>
                    <LoginLogo resizeMode="contain" source={require('../assets/profile.png')} />
                </ProfileContainer>
            </LoginTab>

            <View style={styles.textContainer}>
                <LoginTitle>Name</LoginTitle>
                <NormText>Jiwon Jung</NormText>
                <LoginTitle>Username</LoginTitle>
                <NormText>hello@gmail.com</NormText>
            </View>
            <BottomContainer>
                <StyledButton onPress={() => navigation.navigate("ChangePassword")}>
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