import React, { useState } from 'react';
import { Link } from 'expo-router';
import {
    StyleSheet,
    SafeAreaView,
    View, FlatList,
    TouchableWithoutFeedback,
    Text, ScrollView,
    Dimensions,
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

const data = [
    {
        id: 1,
        date: '12/1/2024',
        name: 'Rachel Yeo',
        school: 'Methodist Primary School',
        studentclass: 'Class 1',
        status: 'In School',
        studentid: 'S2301234',
        transporttype: 'Bus',
        pickuptime: '7:45 AM',
        dismissaltime: '2:00 PM',
    },
    {
        id: 2,
        date: '12/1/2024',
        name: 'Chaim Yeo',
        school: 'Methodist Primary School',
        studentclass: 'Class 2',
        status: 'In School',
        studentid: 'S2301235',
        transporttype: 'Bus',
        pickuptime: '7:45 AM',
        dismissaltime: '2:00 PM',
    },
];


const ScheduleScreen = ({ navigation, route }) => {
    const { userId, accessToken, refreshToken } = route.params;
    const [value, setValue] = useState(new Date());

    const startOfWeek = moment().startOf('week');

    const daysOfWeek = Array.from({ length: 7 }).map((_, index) => {
        const date = moment(startOfWeek).add(index, 'days');
        const isActive = value.toDateString() === date.toDate().toDateString();

        return (
            <TouchableWithoutFeedback
                key={index}
                onPress={() => setValue(date.toDate())}
            >
                <View
                    style={[
                        styles.item,
                        isActive && { backgroundColor: '#111', borderColor: '#111' },
                    ]}>
                    <Text style={[styles.itemWeekday, isActive && { color: '#fff' }]}>
                        {date.format('ddd')}
                    </Text>
                    <Text style={[styles.itemDate, isActive && { color: '#fff' }]}>
                        {date.date()}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    });
    return (
        <StyledContainer>
            <ProfileTop name="Updates" />
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={styles.picker}>{daysOfWeek}</View>
                <View style={{ paddingHorizontal: 16, paddingVertical: 5 }}>
                    <Subtitle>{value.toDateString()}</Subtitle>
                </View>
                <Swiper>
                    {data.map((item, index) => (
                        <View key={index} style={styles.placeholderInset}>
                            <PageTitle>Today's Schedule</PageTitle>
                            <Line></Line>
                            <View style={styles.TopContainer}>
                                <StyledScheduleView>
                                    <MostSmallLogo
                                        resizeMode="contain" source={require('../../src/assets/student.png')} />
                                    <InnerScheduleView>
                                        <Subtitle>{item.name}</Subtitle>
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
                                    <NormText>Morning pick up Time: {item.pickuptime}</NormText>
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
                        </View>
                    ))}
                </Swiper>
                <StyledButton>
                    <ButtonText>
                        Change transport type from bus to parent
                    </ButtonText>
                </StyledButton>
                <StyledButton onPress={() => navigation.navigate("Assign")}>
                    <ButtonText>
                        assign guardian to pickup on this day
                    </ButtonText>
                </StyledButton>
            </ScrollView>
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
    header: {
        paddingTop: 14,
        backgroundColor: Colors.primary,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1d1d1d',
        marginBottom: 12,
    },
    picker: {
        flex: 1,
        maxHeight: 74,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
    },
    footer: {
        marginTop: 'auto',
        paddingHorizontal: 16,
    },
    /** Item */
    item: {
        flex: 1,
        height: 50,
        marginHorizontal: 4,
        paddingVertical: 6,
        paddingHorizontal: 4,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#e3e3e3',
        flexDirection: 'column',
        alignItems: 'center',
    },
    itemRow: {
        width: width,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginHorizontal: -4,
    },
    itemWeekday: {
        fontSize: 13,
        fontWeight: '500',
        color: '#737373',
    },
    itemDate: {
        fontSize: 15,
        fontWeight: '600',
        color: '#111',
    },

    /** Placeholder */
    placeholder: {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
        height: 400,
        marginTop: 0,
        padding: 0,
        backgroundColor: 'transparent',
    },
    placeholderInset: {
        borderWidth: 4,
        borderColor: '#e5e7eb',
        borderStyle: 'dashed',
        borderRadius: 9,
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 0,
    },
    TopContainer: {
        width: width,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: Colors.bgrey,
    },
});

export default ScheduleScreen;