import React from "react";
import { Link, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from "react-native";
import PropTypes from 'prop-types';

import {
    Colors, CardTextStatus,
} from '../components/styles';

export default function Card({ firstName, lastName, status, school, grade, studentID, accessToken }) {
    return (
        <Link key={studentID} push href={{
            pathname: "/parent/ScheduleScreen",
            params: {
                studentid: studentID,
                accessToken: accessToken
            }
        }} asChild>
            <TouchableOpacity style={styles.container}>
                <TouchableOpacity style={styles.logoContainer}>
                    <Image
                        resizeMode="contain" source={require('../assets/student.png')}
                        style={styles.logImage}
                    />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                    <Text style={styles.textOne} numberOfLines={1}>
                        {firstName} {lastName}
                    </Text>
                    <CardTextStatus>
                        {status}
                    </CardTextStatus>
                    <Text style={styles.textTwo}>{school}</Text>
                </View>
                <View style={styles.gradeTextContainer}>
                    <Text style={styles.textTwo}>
                        {grade}
                    </Text>
                    <Text style={styles.textTwo}>
                        {studentID}
                    </Text>
                </View>
            </TouchableOpacity>
        </Link>
    );
}

Card.propTypes = {
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    school: PropTypes.string.isRequired,
    grade: PropTypes.string.isRequired,
    studentID: PropTypes.string.isRequired,
    onPress: PropTypes.func,
};

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
    },
    container: {
        //flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 16,
        marginBottom: 20,
        borderRadius: 12,
        backgroundColor: Colors.plain,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,
    },
    logoContainer: {
        width: 50,
        height: 50,
        backgroundColor: Colors.plain,
        borderRadius: 16,
        justifyContent: "center",
        alignItems: "center",
    },
    logImage: {
        width: "70%",
        height: "70%",
    },
    textContainer: {
        flex: 1,
        marginHorizontal: 16,
    },
    gradeTextContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textOne: {
        fontSize: 16,
        color: Colors.night,
    },
    textTwo: {
        fontSize: 14,
        color: Colors.darkLight,
        marginTop: 3,
        textTransform: "capitalize",
    },
    iconContainer: {
        backgroundColor: Colors.plain,
        width: 45,
        height: 45,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    cardText: {
        color: Colors.night,
        fontWeight: "400",
        fontSize: 16,
        marginVertical: 18,
    },
    cardTextSmall: {
        color: Colors.night,
        fontSize: 16,
    },
});