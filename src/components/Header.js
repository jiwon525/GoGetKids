import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
    StyledContainer,
    InnerContainer,
    PageTitle,
    LoginTab,
    Colors,
    LoginLogo
} from '../components/styles';
const Header = ({ label }) => {
    console.log(label);
    return (
        <View style={styles.container}>
            <Text style={styles.labelStyle}>{label}</Text>
        </View>
    );//{"\n"}
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: 70,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
    },
    labelStyle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
});

export default Header;