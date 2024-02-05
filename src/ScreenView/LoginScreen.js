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
import axios from 'axios';



LoginScreen = ({ navigation }) => {
    const [hidePassword, setHidePassword] = useState(true);
    /*
        const handleLogin = async (values) => {
            try {
                const url = 'https://gogetkids-dashboard.vercel.app/api/login'
                const response = await axios.post(url, {
    
                    email: values.email,
                    password: values.password, //need to hash
                    role: values.role,
                });
    
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        // Authentication successful, navigate to the respective screen
                        navigation.navigate("Home", { role: values.role });
                    } else {
                        // Authentication failed, handle error (e.g., show error message)
                        Alert.alert('Authentication Failed', result.message);
                    }
                } else {
                    // Authentication failed, handle error (e.g., show error message)
                    Alert.alert('Authentication Failed', 'Please check your credentials.');
                }
            } catch (error) {
                console.error('Error during authentication:', error);
            }
        };*/

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
                        initialValues={{ email: '', password: '', role: '' }}
                        onSubmit={(values) => {
                            console.log(values);
                            navigation.navigate("Home");
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
                                <StyledButton onPress={() => { handleSubmit(); values.role = 'parent'; }}>
                                    <ButtonText>
                                        Login as Parent
                                    </ButtonText>
                                </StyledButton>
                                <Line />
                                <StyledButton teacher={true} onPress={() => { handleSubmit(); values.role = 'teacher'; }}>
                                    <ButtonText>
                                        Login as Teacher
                                    </ButtonText>
                                </StyledButton>
                                <Line />
                                <StyledButton driver={true} onPress={() => { handleSubmit(); values.role = 'driver'; }}>
                                    <ButtonText>
                                        Login as Driver
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