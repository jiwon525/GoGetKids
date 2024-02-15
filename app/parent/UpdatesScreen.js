import React, { useState } from 'react';
import { Link } from 'expo-router';
import {
    StyleSheet,
    SafeAreaView,
    View, FlatList,
    TouchableWithoutFeedback,
    Text, ScrollView,
    Dimensions, Alert,
} from "react-native";
import {
    StyledContainer, StyledButton, ButtonText, NormText, Line, TextContainer,
    ProfileContainer, BottomContainer, PageTitle, ExtraText, InnerScheduleView,
    StyledScheduleView, Subtitle, Colors, MostSmallLogo, CardTextStatus,
} from '../../src/components/styles';
import { Ionicons } from '@expo/vector-icons';
import ProfileTop from '../../src/components/ProfileTop';
import Swiper from 'react-native-swiper';
import moment from 'moment';
import { useUserSession } from '../../UserSessionContext';
import { changeTransportType } from '../../src/components/schema'

const UpdatesScreen = () => {
    const { userDetails, setScheduleDetails, scheduleDetails } = useUserSession();
    const today = moment().format('YYYY-MM-DD');
    const handleChangeTransportType = async ({ studentSchedule }) => {
        try {
            Alert.alert(
                "Confirm",
                "Are you sure you want to change the transport type to self pick up?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    {
                        text: "OK", onPress: async () => {
                            // Call changeTransportType function to change transport type
                            const us = await changeTransportType(studentSchedule._id, accessToken);
                            const updatedTransportType = us.transport_type;
                            const updatedScheduleDetails = {
                                ...studentSchedule,
                                transporttype: updatedTransportType
                            };
                            await setScheduleDetails(updatedScheduleDetails);
                        }
                    }
                ]
            );
        } catch (error) {
            Alert.alert(
                "Error!",
                "Unable to update transport type",
                [
                    {
                        text: "Ok",
                        style: "cancel"
                    }
                ]
            )
        }
    };
    return (
        <StyledContainer>
            <ProfileTop name="Student Schedule" />
            <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                <Subtitle>{today}</Subtitle>
            </View>
            <Swiper>
                {scheduleDetails.map((item, index) => (
                    <View key={index} style={styles.placeholderInset}>
                        <PageTitle>Schedule Details</PageTitle>
                        <Line></Line>
                        <View style={styles.TopContainer}>
                            <StyledScheduleView>
                                <MostSmallLogo
                                    resizeMode="contain" source={require('../../src/assets/student.png')} />
                                <InnerScheduleView>
                                    <Subtitle>{item.firstName} {item.lastName}</Subtitle>
                                    <ExtraText> - {item.studentid}</ExtraText>
                                </InnerScheduleView>
                            </StyledScheduleView>
                            <View style={styles.cardContainer}>
                                <CardTextStatus>{item.status} - {item.studentclass}</CardTextStatus>
                            </View>
                        </View>
                        <Line></Line>
                        <StyledScheduleView>
                            <Ionicons name="school-outline" size={30} color="black" />
                            <TextContainer>
                                <NormText>{item.school}</NormText>
                            </TextContainer>
                        </StyledScheduleView>
                        <Line></Line>
                        <StyledScheduleView>
                            <Ionicons name="sunny-outline" size={30} color="black" />
                            <TextContainer>
                                {item.pickuptime === "Invalid" || !item.pickuptime ? (
                                    <NormText>Parents Car to School!</NormText>
                                ) : (
                                    <NormText>Morning pick up Time: {item.pickuptime}</NormText>
                                )}
                            </TextContainer>
                        </StyledScheduleView>
                        <Line></Line>
                        <StyledScheduleView>
                            <Ionicons name="moon-outline" size={30} color="black" />
                            <TextContainer>
                                <NormText>School dismissal Time: {item.dismissaltime}</NormText>
                            </TextContainer>
                        </StyledScheduleView>
                        <Line></Line>
                        <StyledScheduleView>
                            <Ionicons name="location-outline" size={30} color="black" />
                            <TextContainer>
                                <NormText>Transport type: {item.transporttype}</NormText>
                            </TextContainer>
                        </StyledScheduleView>
                        <View style={styles.buttonContainer}>
                            {item.transporttype === 'Bus' && (
                                <StyledButton onPress={() => handleChangeTransportType(item)}>
                                    <ButtonText>
                                        Self PickUp
                                    </ButtonText>
                                </StyledButton>
                            )}
                            <Link href={{
                                pathname: "/parent/AssignGuardian",
                                params: {
                                    scheduleid: item._id,
                                    studentid: item.studentid
                                }
                            }} asChild>
                                <StyledButton>
                                    <ButtonText>
                                        Assign guardian to pickup
                                    </ButtonText>
                                </StyledButton>
                            </Link>
                        </View>
                    </View>
                ))}
            </Swiper>
        </StyledContainer>
    );
};
const width = Dimensions.get('window').width
const styles = StyleSheet.create({
    placeholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    cardContainer: {
        width: width * 0.9,
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
    buttonContainer: {
        marginTop: 'auto',

    },
    TopContainer: {
        width: width - 8,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: Colors.bgrey,
    },
});

export default UpdatesScreen;