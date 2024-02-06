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
import ProfileTop from '../components/ProfileTop';
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import signUp from '../components/schema'


SignUpScreen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

    const handleSignUp = async (values) => {
        try {
            if (values.password !== values.confirmPassword) {
                setFieldError('confirmPassword', 'Passwords do not match');
            } else {
                const userData = {
                    email: values.email,
                    firstName: values.FName,
                    lastName: values.LName,
                    password: values.password,
                    phoneNum: values.phoneNum,
                    role: "parent"
                };
                await signUp(userData, navigation);
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };


    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <ProfileTop
                name="Sign Up" />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <InnerContainer>
                    <Formik
                        initialValues={{ email: '', FName: '', LName: '', password: '', confirmPassword: '', phoneNum: '' }}
                        onSubmit={handleSignUp}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <View style={{ flexDirection: 'row' }}>
                                    <MyTextInput
                                        label="First Name"
                                        icon="person"
                                        placeholder="John"
                                        placeholderTextColor={Colors.darkLight}
                                        onChangeText={handleChange('FName')}
                                        onBlur={handleBlur('FName')}
                                        value={values.FName}
                                        style={{ flex: 1, marginRight: 10 }}
                                    />
                                    <MyTextInput
                                        label="Last Name"
                                        icon="person"
                                        placeholder="Doe"
                                        placeholderTextColor={Colors.darkLight}
                                        onChangeText={handleChange('LName')}
                                        onBlur={handleBlur('LName')}
                                        value={values.LName}
                                        style={{ flex: 1, marginLeft: 10 }}
                                    />
                                </View>
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
                                <MyTextInput
                                    label="Confirm Password"
                                    icon="lock"
                                    placeholder="****"
                                    placeholderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    value={values.confirmPassword}
                                    secureTextEntry={hideConfirmPassword}
                                    isPassword={true}
                                    hidePassword={hideConfirmPassword}
                                    setHidePassword={setHideConfirmPassword} f
                                />
                                <MyTextInput
                                    label="Phone Number (no spacing)"
                                    icon="number"
                                    placeholder="12341234"
                                    placeholderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('phoneNum')}
                                    onBlur={handleBlur('phoneNum')}
                                    value={values.phoneNum}
                                    keyboardType="numeric"
                                />
                                <MsgBox>...</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Sign Up
                                    </ButtonText>
                                </StyledButton>
                                <Line />
                                <ExtraView>
                                    <ExtraText>Already have an account? </ExtraText>
                                    <TextLink onPress={() => navigation.navigate("Login")}>
                                        <TextLinkContent>
                                            Login
                                        </TextLinkContent>
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
        <View style={{ flex: 1 }}>
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
        paddingTop: 15,
        width: deviceWidth,
        height: deviceHeight * 0.1,
        paddingBottom: 0,
        backgroundColor: Colors.primary,
    },
});

export default SignUpScreen; 