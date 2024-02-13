import React, { useState, useEffect } from 'react';
import { Link } from 'expo-router';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import ProfileTop from '../src/components/ProfileTop';
import {
    StyledContainer, Colors, InnerContainer,
} from '../src/components/styles';

const ScanScreen = ({ navigation }) => {
    const [hasPermission, setHasPermission] = React.useState(false);
    const [scanData, setScanData] = React.useState();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    if (!hasPermission) {
        return (
            <StyledContainer>
                <Text>Please grant camera permissions to app.</Text>
            </StyledContainer>
        );
    }
    // What happens when we scan the bar code
    const handleQRScanned = ({ type, data }) => {
        setScanData(data);
        console.log(`Data: ${data}`);
        console.log(`Type: ${type}`);
        navigation.navigate("Home");
    };
    return (
        <StyledContainer>
            <ProfileTop name="Scan QR" navigation={navigation} />

            <BarCodeScanner
                style={styles.scanBox}
                onBarCodeScanned={scanData ? undefined : handleQRScanned}
            />
            {scanData && <Button title='Scan Again?' onPress={() => setScanData(undefined)} />}
        </StyledContainer>
    );
}
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scanBox: {
        height: deviceHeight * 0.8,
        width: deviceWidth,
    },
});

export default ScanScreen;