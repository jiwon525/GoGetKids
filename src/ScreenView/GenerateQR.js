import QRCode from 'react-native-qrcode-svg';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import {
    StyledContainer, StyledButton, ButtonText, NormText, Line, Colors,
    ProfileContainer, BottomContainer, PageTitle, ExtraText, InnerContainer,
    StyledScheduleView, MostSmallLogo, InnerScheduleView, Subtitle, CardTextStatus, TextContainer,
} from '../components/styles';
import { Ionicons } from '@expo/vector-icons';
import ProfileTop from '../components/ProfileTop';


const GenerateQR = ({ navigation }) => {
    const [qrValue, setQrValue] = useState("student id here");
    const [qrSize, setQrSize] = useState(0);
    useEffect(() => {
        // Calculate the size of the QR code to fit the screen
        const screenDimensions = Dimensions.get('window');
        const maxSize = Math.min(screenDimensions.width, screenDimensions.height) * 0.7; // Adjust this factor as needed
        setQrSize(maxSize);
    }, []);

    return (
        <StyledContainer>
            <ProfileTop name='Generate QR code' />
            <View style={styles.placeholderInset}>
                <PageTitle>Today's PickUp QR</PageTitle>
                <Line></Line>
                <View style={styles.qrCodeContainer}>
                    <QRCode
                        value={qrValue}
                        color={'#2C8DDB'}
                        backgroundColor={'white'}
                        size={qrSize}
                    // Add more props as needed
                    />
                </View>
            </View>
        </StyledContainer>
    );
};
const deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
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
    },
});

export default GenerateQR;