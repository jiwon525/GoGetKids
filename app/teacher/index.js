import React, { useState, useEffect } from 'react';
import Checkbox from 'expo-checkbox';
import { Link } from 'expo-router';
import {
    StyleSheet, View, SafeAreaView,
    Dimensions, ScrollView,
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

const { width } = Dimensions.get('window');

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        studentid: 'S10192353',
        transport: 'Parent',
        zone: '',
        name: 'Elliot Batts',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        studentid: 'S10194567',
        transport: 'Bus',
        zone: 'Zone A',
        name: 'Rachel Yeo',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        studentid: 'S10199865',
        transport: 'Bus',
        zone: 'Zone A',
        name: 'Allyn Rodney',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d71',
        studentid: 'S10195642',
        transport: 'Bus',
        zone: 'Zone B',
        name: 'Oliver Tan',
    },
    {
        id: '58694a0f-3341-471f-bd96-145571e29d71',
        studentid: 'S10194567',
        transport: 'Parent',
        zone: '',
        name: 'Chaim Yeo',
    },
    {
        id: '58694a0f-3da1-4gtf-bd96-145571e29d71',
        studentid: 'S10191212',
        transport: 'Bus',
        zone: 'Zone A',
        name: 'Adam Lee',
    },
];

const Item = ({ studentid, transport, zone, name }) => (
    <StyledContainer>
        <StyledScheduleView list={true}>
            <MostSmallLogo
                resizeMode="contain" source={require('../../src/assets/student.png')} />
            <InnerScheduleView>
                <ExtraText>{name} - {studentid}</ExtraText>
            </InnerScheduleView>
        </StyledScheduleView>
        <ListItem>
            <ExtraText>Transport Type: </ExtraText><NormText>{zone} {transport}</NormText>
        </ListItem>
        <Line></Line>
    </StyledContainer>
);

const StudentListScreen = ({ navigation }) => {
    const [ParentisChecked, psetChecked] = useState(true);
    const [BusisChecked, bsetChecked] = useState(true);

    const [filteredList, setFilteredList] = useState(DATA);

    useEffect(() => {
        const updatedList = DATA.filter(item => {
            if (ParentisChecked && BusisChecked) {
                return true;  // Show all when both checkboxes are checked
            } else if (ParentisChecked) {
                return item.transport === 'Parent';
            } else if (BusisChecked) {
                return item.transport === 'Bus';
            }
            return false;  // Show nth when both checkboxes are unchecked
        });
        setFilteredList(updatedList);
    }, [ParentisChecked, BusisChecked]);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <ProfileTop name="Students" navigation={navigation} />
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
                                    onValueChange={psetChecked}
                                    color={ParentisChecked ? '#4630EB' : undefined}
                                /><Subtitle> Parent</Subtitle>
                            </View>
                            <View style={styles.check}>
                                <Checkbox
                                    value={BusisChecked}
                                    onValueChange={bsetChecked}
                                    color={BusisChecked ? '#4630EB' : undefined}
                                /><Subtitle> Bus</Subtitle>
                            </View>
                        </View>
                        <FlatList
                            key={filteredList.length}
                            data={filteredList}
                            renderItem={({ item }) => <Item studentid={item.studentid} zone={item.zone} name={item.name} transport={item.transport} />}
                            keyExtractor={item => item.id}
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