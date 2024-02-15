import React, { useState, useEffect } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab,
    Colors, LoginLogo, LoginTitle, InnerMidContainer,
    StyledFormArea, LeftIcon, StyledButton, ButtonText,
    StyledInputLabel, StyledTextInput, RightIcon,
    MsgBox, Line, ExtraText, ExtraView, TextLink, TextLinkContent, Subtitle,
} from '../../src/components/styles';
import { Formik } from 'formik';
import { Octicons, Ionicons } from '@expo/vector-icons'
import ProfileTop from '../../src/components/ProfileTop';
import { StyleSheet, View, Dimensions, ScrollView } from "react-native";
import QRCode from 'react-native-qrcode-svg';

const AssignGuardian = () => {
    const params = useLocalSearchParams();
    const { scheduleid, studentid } = params;
    const [showQR, setShowQR] = useState(false);
    const [qrSize, setQrSize] = useState(0);
    let logoFromFile = require('../../src/assets/children.png');
    useEffect(() => {
        // Calculate the size of the QR code to fit the screen
        const screenDimensions = Dimensions.get('window');
        const maxSize = Math.min(screenDimensions.width, screenDimensions.height) * 0.8; // Adjust this factor as needed
        setQrSize(maxSize);
    }, []);
    const handleSubmit = async (values) => {
        try {
            setShowQR(true); // Set the state to show QR code
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <ProfileTop
                name="Assign" />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <InnerContainer>
                    <Formik
                        initialValues={{ guardianName: '' }}
                        onSubmit={(values) => {
                            handleSubmit(values);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values }) => (
                            <StyledFormArea>

                                <Subtitle>Name of guardian for pickup</Subtitle>
                                <ExtraText> </ExtraText>
                                <MyTextInput
                                    label="Name"
                                    icon="person"
                                    placeholder="John Doe"
                                    placeholderTextColor={Colors.darkLight}
                                    onChangeText={handleChange('guardianName')}
                                    onBlur={handleBlur('guardianName')}
                                    value={values.guardianName}
                                />

                                <MsgBox>...</MsgBox>
                                <StyledButton onPress={handleSubmit}>
                                    <ButtonText>
                                        Generate QR Code
                                    </ButtonText>
                                </StyledButton>
                                <Line />
                                {showQR && (
                                    <ExtraView>
                                        <View style={styles.placeholderInset}>
                                            <PageTitle>Today's PickUp QR</PageTitle>
                                            <Line></Line>
                                            <View style={styles.qrCodeContainer}>
                                                <QRCode
                                                    value={JSON.stringify({ id: scheduleid, studentid: studentid, guardianName: values.guardianName })}
                                                    color={'#2C8DDB'}
                                                    logo={logoFromFile}
                                                    logoBackgroundColor='white'
                                                    backgroundColor={'white'}
                                                    size={qrSize}
                                                />
                                            </View>
                                        </View>
                                    </ExtraView>
                                )}
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