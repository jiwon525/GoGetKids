import React, { useState } from 'react';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab,
    Colors, LoginLogo, LoginTitle, InnerMidContainer,
    StyledFormArea, LeftIcon, StyledButton, ButtonText,
    StyledInputLabel, StyledTextInput, RightIcon,
    MsgBox, Line, ExtraText, ExtraView, TextLink, TextLinkContent,
} from '../../src/components/styles'
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons';
import ProfileTop from '../../src/components/ProfileTop';
import { StyleSheet, View, Dimensions, ScrollView, Alert } from "react-native";
import { changepassword } from '../../src/components/schema';
import { useUserSession } from '../../UserSessionContext';
const ChangePasswordScreen = () => {
    const [hideNewPassword, setHideNewPassword] = useState(true);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
    const { userDetails } = useUserSession();

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <ProfileTop name="Change Password" />
            <ScrollView showsVerticalScrollIndicator={false}>
                <InnerContainer>
                    <Formik
                        initialValues={{ newPassword: '', confirmPassword: '' }}
                        onSubmit={(values) => {
                            if (values.newPassword === values.confirmPassword) {
                                changepassword(userDetails._id, values.newPassword, userDetails.accessToken)
                                router.replace('/parent');
                                Alert.alert('Success!', 'Password has been changed');
                            } else {
                                Alert.alert('Unable to change password', 'Please enter the same password!');
                            }

                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>
                                <MyTextInput
                                    label="New Password"
                                    icon="lock"
                                    placeholder="****"
                                    placeholderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('newPassword')}
                                    onBlur={handleBlur('newPassword')}
                                    value={values.newPassword}
                                    secureTextEntry={hideNewPassword}
                                    isPassword={true}
                                    hidePassword={hideNewPassword}
                                    setHidePassword={setHideNewPassword}
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
                                    setHidePassword={setHideConfirmPassword}
                                />
                                <MsgBox>...</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Change Password
                                    </ButtonText>
                                </StyledButton>
                                <Line />
                                <ExtraView>
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

export default ChangePasswordScreen;
