import React from 'react';
import {
    PageTitle,
    Colors, BackIcon, AlignRow,
} from '../components/styles';
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

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
        flex: 1,
        paddingTop: 25,
        backgroundColor: Colors.primary,
    },
});

export default ProfileTop;