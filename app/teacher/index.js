import React, { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import {
    StyleSheet, View, SafeAreaView,
    Dimensions, ScrollView, Text,
    TouchableOpacity, FlatList,
} from 'react-native';
import moment from 'moment';
import { Ionicons } from "@expo/vector-icons";
import {
    PageTitle, Line, StyledScheduleView, NormText, ListItem, InnerScheduleView, MostSmallLogo,
    Colors, BackIcon, AlignRow, StyledContainer, InnerContainer, StyledFormArea, ExtraText,
    Subtitle,
    StyledInputLabel,
} from '../../src/components/styles';
import ProfileTop from '../../src/components/ProfileTop';
import { useUserSession } from '../../UserSessionContext';
import { fetchTeacherStudents } from '../../src/components/schema'
const { width } = Dimensions.get('window');

const Item = ({ studentid, transport, zone, firstname, lastname }) => (
    <StyledContainer>
        <StyledScheduleView list={true}>
            <MostSmallLogo
                resizeMode="contain" source={require('../../src/assets/student.png')} />
            <InnerScheduleView>
                <ExtraText>{firstname} {lastname} - {studentid}</ExtraText>
            </InnerScheduleView>
        </StyledScheduleView>
        <ListItem>
            <ExtraText>Transport Type: </ExtraText><NormText>{zone} {transport}</NormText>
        </ListItem>
        <Line></Line>
    </StyledContainer>
);

const StudentListScreen = () => {
    const { userDetails } = useUserSession();
    const [ParentisChecked, setParentisChecked] = useState(true);
    const [BusisChecked, setBusisChecked] = useState(true);
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchTeacherStudents(userDetails.email, userDetails.accessToken);
            console.log(response);
            if (response) {
                const newStudents = response.map(student => {
                    // Example transformation: You might want to add a new field, modify an existing one, etc.
                    // For now, we'll just return the student object as-is, assuming no transformation is needed.
                    // Insert any transformation or additional processing you need here.
                    return student;
                });
                setStudents(newStudents);
            } else {
                console.log("Schedule for student not found");
            }
            setStudents(response); // Store the fetched students in state
            filterStudents(response, ParentisChecked, BusisChecked);
        };
        fetchData();
    }, []);

    // Update filtered list when checkboxes change
    useEffect(() => {
        filterStudents(students, ParentisChecked, BusisChecked);
    }, [ParentisChecked, BusisChecked, students]);

    // Function to filter students based on transport type
    const filterStudents = (studentsList, parentCheck, busCheck) => {
        const updatedList = studentsList.filter(student => {
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
                            <NormText>Class 1</NormText>
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
                            data={students}
                            keyExtractor={(item) => item.studentid}
                            renderItem={({ item }) => (
                                <Item
                                    studentid={item.studentid.$numberInt}
                                    firstname={item.firstname}
                                    lastname={item.lastname}
                                    transport={item.transport_type}
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

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginVertical: 12,
    },
    check: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 5,
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
        marginBottom: 4,
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
    /** Button */
    btn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        backgroundColor: '#007aff',
        borderColor: '#007aff',
    },
    btnText: {
        fontSize: 18,
        lineHeight: 26,
        fontWeight: '600',
        color: '#fff',
    },
});
export default StudentListScreen;