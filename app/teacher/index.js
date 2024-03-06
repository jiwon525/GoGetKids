import React, { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import {
    StyleSheet, View, SafeAreaView,
    Dimensions, ScrollView, Text,
    TouchableOpacity, FlatList,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { Ionicons } from "@expo/vector-icons";
import {
    PageTitle, Line, StyledScheduleView, NormText, ListItem, InnerScheduleView, MostSmallLogo,
    Colors, BackIcon, AlignRow, StyledContainer, InnerContainer, StyledFormArea, ExtraText,
    Subtitle, CardTextStatus,
    StyledInputLabel,
} from '../../src/components/styles';
import ProfileTop from '../../src/components/ProfileTop';
import { useUserSession } from '../../UserSessionContext';
import { fetchTeacherStudents } from '../../src/components/schema'

import StudentDetails from '../../src/components/StudentDetails';

const Item = ({ studentid, transport, status, zone, firstname, lastname }) => (
    <StyledContainer>
        <StyledScheduleView list={true}>
            <MostSmallLogo
                resizeMode="contain" source={require('../../src/assets/student.png')} />
            <InnerScheduleView>
                <ExtraText>{firstname} {lastname} - {studentid}</ExtraText>
            </InnerScheduleView>

        </StyledScheduleView>
        <View style={styles.align}>
            <View style={styles.cardContainer}>
                <CardTextStatus>Status : {status} </CardTextStatus>
            </View>
        </View>
        <ListItem>
            <NormText>Transport Type: {transport}</NormText>
        </ListItem>
        <ListItem>
            <NormText>Transport Zone: {zone}</NormText>
        </ListItem>
        <Line></Line>
    </StyledContainer>
);

const StudentListScreen = () => {
    const { userDetails, setStudentDetails, studentDetails } = useUserSession();
    const [ParentisChecked, setParentisChecked] = useState(true);
    const [BusisChecked, setBusisChecked] = useState(true);
    const [classname, setClassname] = useState('');
    const [filteredStudents, setFilteredStudents] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {
        console.log("set students on initial load", studentDetails)
        const fetchData = async () => {
            const fetchedStudentDetails = await fetchTeacherStudents(userDetails.email, userDetails.accessToken);
            console.log("fetched student array from teacher students ", fetchedStudentDetails);
            if (fetchedStudentDetails) {
                const studentDetailsArray = fetchedStudentDetails.map(student =>
                    new StudentDetails(
                        student._id,
                        student.address,
                        student.class_name,
                        student.dob,
                        student.firstname,
                        student.gender,
                        student.lastname,
                        student.parent_id,
                        student.postcode,
                        student.school_name,
                        student.status,
                        student.studentid,
                        student.zone
                    )
                );
                setStudentDetails(studentDetailsArray);
                filterStudents(studentDetailsArray, ParentisChecked, BusisChecked);
                setClassname(studentDetailsArray[0].class_name);
            } else {
                console.log("Schedule for student not found");
            }
        };
        if (isFocused) {
            fetchData();
        }
    }, [isFocused]);

    // Update filtered list when checkboxes change
    useEffect(() => {
        filterStudents(studentDetails, ParentisChecked, BusisChecked);
    }, [ParentisChecked, BusisChecked, studentDetails]);

    // Function to filter students based on transport type
    const filterStudents = (studentsList, parentCheck, busCheck) => {
        // Ensure studentsList is an array and not null before calling filter
        const validList = studentsList || [];
        const updatedList = validList.filter(student => {
            if (parentCheck && busCheck) {
                return true; // Show all if both checkboxes are checked
            } else if (parentCheck) {
                return student.transport_type === 'Parent';
            } else if (busCheck) {
                return student.transport_type === 'Bus';
            }
            return false; // Show none if both checkboxes are unchecked
        });
        setFilteredStudents(updatedList);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <ProfileTop name="Students" />
                <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 5 }}>
                    <StyledScheduleView>
                        <Ionicons name="easel-outline" size={30} color="black" />
                        <InnerScheduleView>
                            <NormText>Class name: {classname}</NormText>
                        </InnerScheduleView>
                    </StyledScheduleView>
                    <StyledContainer>
                        <Line></Line>
                        <View style={styles.container}>
                            <View style={styles.check}>
                                <Checkbox
                                    value={ParentisChecked}
                                    onValueChange={setParentisChecked}
                                    color={ParentisChecked ? '#4630EB' : undefined}
                                />
                                <Text> Parent</Text>
                            </View>
                            <View style={styles.check}>
                                <Checkbox
                                    value={BusisChecked}
                                    onValueChange={setBusisChecked}
                                    color={BusisChecked ? '#4630EB' : undefined}
                                />
                                <Text> Bus</Text>
                            </View>
                        </View>
                        <FlatList
                            data={filteredStudents}
                            keyExtractor={(item) => item.studentid}
                            renderItem={({ item }) => (
                                <Item
                                    studentid={item.studentid}
                                    firstname={item.firstname}
                                    lastname={item.lastname}
                                    transport={item.transport_type}
                                    status={item.status}
                                    zone={item.zone}
                                />
                            )}
                        />
                    </StyledContainer>
                </View>
            </StyledContainer>
        </SafeAreaView>

    );
};
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 12,
    },
    align: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    check: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
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
    cardContainer: {
        width: deviceWidth * 0.9,
        padding: 10,
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
export default StudentListScreen;