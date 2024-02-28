import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
    StyledContainer, InnerContainer, PageTitle, LoginTab,
    Colors, LoginLogo, LoginTitle, InnerMidContainer,
    StyledFormArea, LeftIcon, StyledButton, ButtonText,
    StyledInputLabel, StyledTextInput, RightIcon,
    MsgBox, Line, ExtraText, ExtraView, TextLink, TextLinkContent, NormText,
} from '../../src/components/styles';
import { Octicons, Ionicons } from '@expo/vector-icons'
import ProfileTop from '../../src/components/ProfileTop';
import { StyleSheet, View, Dimensions, ScrollView, Alert, TouchableOpacity, Text } from "react-native";
import { Link, router } from 'expo-router';
import { useUserSession } from '../../UserSessionContext';
import moment from 'moment';

ScanScreen = () => {
    const { userDetails, studentDetails, scheduleDetails } = useUserSession();
    const today = moment().format('YYYY-MM-DD');

    return (
        <StyledContainer>
            <StatusBar style="dark" />
            <ProfileTop
                name="Select Student" />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <InnerContainer>
                    {studentDetails.map((item, index) => {
                        const selectS = scheduleDetails.find(schedule => schedule.studentid === item.studentid && schedule.date === today);
                        return (
                            <TouchableOpacity key={item._id} onPress={() => {
                                router.replace({
                                    pathname: "/parent/ScanQR",
                                    params: {
                                        studentid: item.studentid
                                    }
                                });
                            }}>
                                <View style={styles.container}>
                                    <Text style={styles.title}>
                                        {item.firstname} {item.lastname}
                                    </Text>
                                    <View style={styles.cardContainer}>
                                        <Text style={styles.detail}>{item.status}</Text>
                                    </View>
                                    <Text style={styles.detail}>
                                        student ID: {item.studentid}
                                    </Text>
                                    <Text style={styles.detail}>
                                        Transport Type: {selectS ? selectS.transporttype : 'N/A'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </InnerContainer>
            </ScrollView>
        </StyledContainer>
    );
};
/** <Link push href={{
                            pathname: "/parent/ScanQR",
                            params: {
                                studentid: "test",
                            }
                        }} asChild> */
const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        padding: 15,
        marginTop: 15,
        width: deviceWidth * 0.9,
        height: deviceHeight * 0.2,
        marginBottom: 10,
        borderRadius: 5,
        backgroundColor: Colors.primary,
    },
    title: {
        fontWeight: "bold",
        fontSize: 18,
    },
    detail: {
        fontSize: 16,
    },
    cardContainer: {
        marginTop: 10,
        width: deviceWidth * 0.7,
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
        backgroundColor: Colors.plain,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
});

export default ScanScreen; 