import React from 'react';
import {
    PageTitle, LoginSmallLogo,
    Colors, BackIcon, AlignRow,
} from '../components/styles';
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const homename = "Home";


const ProfileTop = ({ name, navigation }) => {
    const handleGoBack = () => {
        navigation.navigate("ParentHome");
        //navigation.navigate.goBack();
    };
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
            <View style={styles.viewStyle}>
                <AlignRow>
                    <PageTitle>{name}</PageTitle>
                </AlignRow>
            </View>
        );
    }
};
const styles = StyleSheet.create({
    viewStyle: {
        paddingTop: 15,
        width: deviceWidth,
        height: deviceHeight * 0.1,
        paddingBottom: 0,
        backgroundColor: Colors.primary,
    },
});

export default ProfileTop;
