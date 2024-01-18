import React from 'react';
import {
    PageTitle,
    Colors, BackIcon, AlignRow,
} from '../components/styles';
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View, Dimensions } from "react-native";
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const ProfileTop = () => {
    return (
        <View style={styles.viewStyle}>
            <AlignRow>
                <BackIcon>
                    <AntDesign name="arrowleft" size={24} color="black" />
                </BackIcon>
                <PageTitle>Home</PageTitle>
            </AlignRow>
        </View>
    );
};
//change the title according to the page that calls it 
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