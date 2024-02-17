import React, { useState } from 'react';
import { Link, router, Redirect } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';
import { StyleSheet, View, Dimensions, ScrollView, Alert } from 'react-native';
import UserDetails from '../src/components/UserDetails';
import { fetchUserData } from '../src/components/schema';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab,
    Colors, LoginLogo, LoginTitle, InnerMidContainer,
    StyledFormArea, LeftIcon, StyledButton, ButtonText,
    StyledInputLabel, StyledTextInput, RightIcon,
    MsgBox, Line, ExtraText, ExtraView, TextLink, TextLinkContent,
} from '../src/components/styles';
import { useUserSession } from '../UserSessionContext';
import LoadingScreen from './loading';

const LoginScreen = () => {
    const [hidePassword, setHidePassword] = useState(true);
    const { userDetails, setUserDetails } = useUserSession();
    const logIn = async ({ email, password }) => {
        router.push("/loading");
        try {
            const response = await fetch('https://services.cloud.mongodb.com/api/client/v2.0/app/gogetkidsmobile-csapx/auth/providers/custom-function/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const responseBody = await response.json();
            if (response.ok) {
                console.log('User logged in successfully');
                const userDetails = await saveUser(responseBody.user_id, responseBody.access_token);
                setUserDetails(userDetails);
                router.replace({
                    pathname: `/${userDetails.role}`,
                });
            } else {
                console.log('Error logging in:', responseBody.error)
                router.push("/");
                showAlert("You don't have an existing account or your password is incorrect")
            }
        } catch (error) {
            console.error('Error:', error.message || 'Unknown error');
        }

    };
    //saving user inside UserDetails entity and inside User Session
    const saveUser = async (userId, accessToken) => {
        try {
            const fetchedUserDetails = await fetchUserData(userId, accessToken);
            const userD = new UserDetails(
                fetchedUserDetails.accessToken,
                fetchedUserDetails._id,
                fetchedUserDetails.email,
                fetchedUserDetails.role,
                fetchedUserDetails.firstName,
                fetchedUserDetails.lastName,
                fetchedUserDetails.license,
                fetchedUserDetails.company_name,
                fetchedUserDetails.school_name
            );
            console.log('User data userD logged into session');
            return userD;
        } catch (error) {
            // Handle any errors that occur during the fetching process
            console.error('Error fetching data:', error);
            return null;
        }
    };

    const showAlert = (errMsg) =>
        Alert.alert('Unable to Log In', errMsg, [
            {
                text: 'Try again',
            },
        ]);
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={styles.viewStyle}>
                    <LoginTitle>Welcome to GoGetKids!</LoginTitle>
                    <InnerMidContainer>
                        <LoginLogo resizeMode="contain" source={require('../src/assets/children.png')} />
                    </InnerMidContainer>
                </View>
                <InnerContainer>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        onSubmit={(values, { resetForm }) => {
                            logIn(values);
                            resetForm();
                        }}>
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
                                    <Link href="/SignupScreen" asChild>
                                        <TextLink>
                                            <TextLinkContent>Sign up</TextLinkContent>
                                        </TextLink>
                                    </Link>
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
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    viewStyle: {
        paddingTop: deviceHeight * 0.04,
        width: deviceWidth,
        height: deviceHeight * 0.3,
        paddingBottom: 10,
        backgroundColor: Colors.primary,
    },
});

export default LoginScreen;
