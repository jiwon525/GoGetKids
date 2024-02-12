import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab,
    Colors, LoginLogo, LoginTitle, InnerMidContainer,
    StyledFormArea, LeftIcon, StyledButton, ButtonText,
    StyledInputLabel, StyledTextInput, RightIcon,
    MsgBox, Line, ExtraText, ExtraView, TextLink, TextLinkContent,
} from '../components/styles';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons'
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import { signIn } from '../components/schema';


LoginScreen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);

    async function signIn(email, password) {
        try {
            const userData = {
                email: email,
                password: password
            };
            console.log(userData);
            const response = await fetch('https://services.cloud.mongodb.com/api/client/v2.0/app/gogetkidsmobile-csapx/auth/providers/custom-function/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const responseBody = await response.json();
            if (response.ok) {
                console.log(responseBody);
                console.log('User logged in successfully:', responseBody.id, responseBody.access_token, responseBody.refresh_token);
                navigation.navigate('Home', {
                    screen: 'ParentHome', // Navigate to ParentHome tab
                    params: {
                        screen: 'HomeScreen', // Navigate to HomeScreen inside ParentHome
                        params: { userId: responseBody.id, userEmail: responseBody.email, userPW: responseBody.pw },
                    }
                });

            } else {
                if (responseBody.error) {
                    console.error('Error logging in:', responseBody.error);
                } else {
                    console.error('Error logging in: Unknown error');
                }
            }
        } catch (error) {
            console.error('Error:', error.message || "Unknown error");
        }
    };
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={styles.viewStyle}>
                    <LoginTitle>Welcome to GoGetKids!</LoginTitle>
                    <InnerMidContainer>
                        <LoginLogo resizeMode="contain" source={require('../assets/children.png')} />
                    </InnerMidContainer>
                </View>
                <InnerContainer>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values) => {
                            signIn(values.email, values.password)
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="Email address"
                                    icon="mail"
                                    placeholder="example@gmail.com"
                                    placeholderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    keyboardType="email-address"
                                />

                                <MyTextInput
                                    label="Password"
                                    icon="lock"
                                    placeholder="****"
                                    placeholderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    value={values.password}
                                    secureTextEntry={hidePassword}
                                    isPassword={true}
                                    hidePassword={hidePassword}
                                    setHidePassword={setHidePassword}
                                />
                                <MsgBox>...</MsgBox>

                                <Line />
                                <StyledButton teacher={true} onPress={() => { handleSubmit(); }}>
                                    <ButtonText>
                                        Login
                                    </ButtonText>
                                </StyledButton>

                                <ExtraView>
                                    <ExtraText>Don't have an account?  </ExtraText>
                                    <TextLink onPress={() => navigation.navigate("SignUp")}>
                                        <TextLinkContent>Sign up</TextLinkContent>
                                    </TextLink>
                                </ExtraView>
                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </ScrollView>
        </StyledContainer>
    );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
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

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    viewStyle: {
        paddingTop: 20,
        width: deviceWidth,
        height: deviceHeight * 0.3,
        paddingBottom: 10,
        backgroundColor: Colors.primary,
    },
});

export default LoginScreen; 