import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    TouchableWithoutFeedback,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import { AntDesign } from "@expo/vector-icons";
import {
    PageTitle,
    Colors, BackIcon, AlignRow,
} from '../components/styles';
//import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const Example = () => {

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
            <View style={styles.container}>
                <View style={styles.header}>
                    <AlignRow>
                        <BackIcon>
                            <AntDesign name="arrowleft" size={24} color="black" />
                        </BackIcon>
                        <PageTitle>Your Schedule</PageTitle>
                    </AlignRow>
                </View>

                <View style={styles.picker}>{daysOfWeek}</View>

                <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 24 }}>
                    <Text style={styles.subtitle}>{value.toDateString()}</Text>
                    <View style={styles.placeholder}>
                        <View style={styles.placeholderInset}>
                            <Text>
                                vehicle number, school name, zone, list of students + list of addresses
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

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
    subtitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#999999',
        marginBottom: 12,
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
export default Example;