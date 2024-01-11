import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Header label="Home" />
            <Text>This is Homepage</Text>
            <StatusBar style="auto" />
            <button title="go to account" />
            <Footer />
        </View>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center',
    },
});

export default HomeScreen;