import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View, FlatList,
    TouchableWithoutFeedback,
    Text,
    Dimensions,
} from 'react-native';
import ProfileTop from '../components/ProfileTop';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';
import {
    PageTitle, LeftIcon, StyledLabel, StyledContainer, ListItem,
    Colors,
} from '../components/styles';
import TripSheet from '../components/TripSheet';

const { width } = Dimensions.get('window');
//need to get data of the date chosen only.
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        address: 'FRANKEL ESTATE on the Coasts East, 5 Dunbar Walk',
        postalcode: '459275',
        name: 'Elliot Batts',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        address: 'East Coast Avenue, 20E',
        postalcode: '459215',
        name: 'Rachel Yeo',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        address: '934 East Coast Road',
        postalcode: '459125',
        name: 'Allyn Rodney',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d71',
        address: 'East Coast Road, 932A',
        postalcode: '459120',
        name: 'Oliver Tan',
    },
    {
        id: '58694a0f-3341-471f-bd96-145571e29d71',
        address: 'East Coast Road, 634',
        postalcode: '459020',
        name: 'Chaim Yeo',
    },
    {
        id: '58694a0f-3da1-4gtf-bd96-145571e29d71',
        address: ' 632 EAST COAST ROAD',
        postalcode: '459018',
        name: 'Adam Lee',
    },
];


const ScheduleScreen = ({ navigation }) => {

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
        <SafeAreaView style={{ flex: 1 }}>
            <StyledContainer>
                <ProfileTop name="Your Schedule" navigation={navigation} />
                <View style={styles.picker}>{daysOfWeek}</View>
                <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 5 }}>
                    <Subtitle>{value.toDateString()}</Subtitle>
                    <View style={styles.placeholder}>
                        <TripSheet
                            school="Methodist Primary"
                            zone="Zone A"
                            vehiclenum="VH32132"
                            DATA={DATA}
                        />
                    </View>
                </View>
            </StyledContainer>
        </SafeAreaView>
    );
};



const styles = StyleSheet.create({
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
});
export default ScheduleScreen;