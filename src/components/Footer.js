import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const Footer = () => {
    console.log();
    return (
        <View style={styles.container}>
            <Text style={styles.footerStyle}>Footer</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 80,
        backgroundColor: '#a29bfe',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
    },
    footerStyle: {
        fontSize: 15,
        fontWeight: 'bold',
    },
});

export default Footer;