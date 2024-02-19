import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const Testscreens = () => {

    const [qrSize, setQrSize] = useState(0);
    useEffect(() => {
        // Calculate the size of the QR code to fit the screen
        const screenDimensions = Dimensions.get('window');
        const maxSize = Math.min(screenDimensions.width, screenDimensions.height) * 0.8; // Adjust this factor as needed
        setQrSize(maxSize);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Bus QR</Text>
            <QRCode
                value={JSON.stringify({ _id: '65cfc184835708e75cdfef4d', vehicleId: 'L321V' })}
                color={'#2C8DDB'}
                backgroundColor={'white'}
                size={qrSize}
            />
            <Text style={styles.header}>School QR</Text>
            <QRCode
                value={JSON.stringify({ _id: '65d2f3cfebffbc6d778bf0a3', schoolName: 'Test School 4' })}
                color={'#2C8DDB'}
                backgroundColor={'white'}
                size={qrSize}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        marginBottom: 8,
    },
});

export default Testscreens;
