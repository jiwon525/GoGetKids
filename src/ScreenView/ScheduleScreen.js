import React from 'react';
import { StyleSheet, View, Dimensions } from "react-native";
import {
    StyledContainer, StyledButton, ButtonText, NormText, Line, Colors,
    ProfileContainer, BottomContainer, PageTitle, ExtraText, InnerContainer,
    StyledScheduleView, MostSmallLogo, InnerScheduleView, Subtitle, CardTextStatus, TextContainer,
} from '../components/styles';
import { Ionicons } from '@expo/vector-icons';
import ProfileTop from '../components/ProfileTop';

const data =
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
};


const ScheduleScreen = ({ navigation }) => {

    return (
        <StyledContainer>
            <ProfileTop name={data.date} />
            <View style={styles.placeholderInset}>
                <PageTitle>Today's Schedule</PageTitle>
                <Line></Line>
                <View style={styles.TopContainer}>
                    <StyledScheduleView>
                        <MostSmallLogo
                            resizeMode="contain" source={require('../assets/student.png')} />
                        <InnerScheduleView>
                            <Subtitle>{data.name}</Subtitle>
                            <ExtraText> - {data.studentid}</ExtraText>
                        </InnerScheduleView>
                    </StyledScheduleView>
                    <View style={styles.cardContainer}>
                        <CardTextStatus>{data.status} - {data.studentclass}</CardTextStatus>
                    </View>
                </View>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="school-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>{data.school}</NormText>
                    </TextContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="sunny-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>Morning pick up Time: {data.pickuptime}</NormText>
                    </TextContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="moon-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>School dismissal Time: {data.dismissaltime}</NormText>
                    </TextContainer>
                </StyledScheduleView>
                <Line></Line>
                <StyledScheduleView>
                    <Ionicons name="location-outline" size={30} color="black" />
                    <TextContainer>
                        <NormText>Transport type: {data.transporttype}</NormText>
                    </TextContainer>
                </StyledScheduleView>
            </View>
            <StyledButton>
                <ButtonText>
                    Change transport type from bus to parent
                </ButtonText>
            </StyledButton>
            <StyledButton onPress={() => navigation.navigate("Assign")}>
                <ButtonText>
                    assign guardian to pickup
                </ButtonText>
            </StyledButton>
        </StyledContainer>
    );
};
const deviceWidth = Dimensions.get('window').width
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
        width: deviceWidth * 0.9,
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
    TopContainer: {
        width: deviceWidth,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
        backgroundColor: Colors.bgrey,
    }
});

export default ScheduleScreen;