import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AccountScreen = () => {
    return (
        <View style={styles.container}>
            <Header label="Home" />
            <Text>This is accountscreen route</Text>
            <StatusBar style="auto" />
            <Footer />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
});

export default AccountScreen;