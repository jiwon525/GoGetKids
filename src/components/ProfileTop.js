import React from 'react';
import {
    PageTitle, LoginSmallLogo,
    Colors, BackIcon, AlignRow,
} from '../components/styles';
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


const homename = "Home";

const ProfileTop = ({ name }) => {
    if (homename === name) {
        return (
            <View style={styles.viewStyle}>
                <AlignRow>
                    <LoginSmallLogo resizeMode="contain" source={require('../assets/children.png')} />
                    <PageTitle>{name}</PageTitle>
                </AlignRow>
            </View>
        );
    } else {
        return (
            <View style={styles.viewStyle2}>
                <AlignRow>
                    <PageTitle>{name}</PageTitle>
                </AlignRow>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    viewStyle: {
        paddingTop: deviceHeight * 0.04,
        width: deviceWidth,
        height: deviceHeight * 0.1,
        backgroundColor: Colors.primary,
    },
    viewStyle2: {
        paddingTop: deviceHeight * 0.035,
        paddingLeft: 24,
        width: deviceWidth,
        height: deviceHeight * 0.1,
        backgroundColor: Colors.primary,
    },
});

export default ProfileTop;
