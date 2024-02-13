import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab,
    Colors, LoginLogo, LoginTitle, InnerMidContainer,
    StyledFormArea, LeftIcon, StyledButton, ButtonText,
    StyledInputLabel, StyledTextInput, RightIcon,
    MsgBox, Line, ExtraText, ExtraView, TextLink, TextLinkContent, Subtitle,
} from '../components/styles';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons'
import ProfileTop from '../components/ProfileTop';
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";


const AssignGuardian = ({ navigation }) => {
    const [qrSize, setQrSize] = useState(0);
    useEffect(() => {
        // Calculate the size of the QR code to fit the screen
        const screenDimensions = Dimensions.get('window');
        const maxSize = Math.min(screenDimensions.width, screenDimensions.height) * 0.9; // Adjust this factor as needed
        setQrSize(maxSize);
    }, []);
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <ProfileTop
                name="Assign" />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <InnerContainer>
                    <Formik
                        initialValues={{ email: '' }}

                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>

                                <Subtitle>Enter in Guardian's email</Subtitle>
                                <ExtraText> </ExtraText>
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

                                <MsgBox>...</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Send Email with QR
                                    </ButtonText>
                                </StyledButton>
                                <Line />
                                <ExtraView>
                                    <View style={styles.placeholderInset}>
                                        <PageTitle>Today's PickUp QR</PageTitle>
                                        <Line></Line>
                                        <View style={styles.qrCodeContainer}>
                                            <QRCode
                                                value={"random"} //need 2 change
                                                color={'#2C8DDB'}
                                                backgroundColor={'white'}
                                                size={qrSize}
                                            // Add more props as needed
                                            />
                                        </View>
                                    </View>
                                </ExtraView>

                            </StyledFormArea>
                        )}
                    </Formik>
                </InnerContainer>
            </ScrollView>
        </StyledContainer>
    );
};

const MyTextInput = ({ label, icon, ...props }) => {
    return (
        <View style={{ flex: 1 }}>
            <LeftIcon>
                <Octicons name={icon} size={30} color="black" />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
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
    placeholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    qrCodeContainer: {
        marginTop: 20, // Adjust spacing as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AssignGuardian; 