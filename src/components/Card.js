import React from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from "react-native";
import PropTypes from 'prop-types';

import {
    Colors,
} from '../components/styles';

export default function Card({ name, status, school, grade, studentID, onPress }) {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                    resizeMode="contain" source={require('../assets/student.png')}
                    style={styles.logImage}
                />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.textOne} numberOfLines={1}>
                    {name}
                </Text>
                <Text style={styles.cardTextStatus} numberOfLines={1}>
                    {status}
                </Text>
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
    );
}

Card.propTypes = {
    name: PropTypes.string.isRequired,
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
    cardContainer: {
        backgroundColor: Colors.primary,
        width: Dimensions.get('window').width * 0.9,
        height: 100,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 5,
        elevation: 9,
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
    cardTextStatus: {
        fontWeight: "bold",
        color: Colors.tertiary,
        fontSize: 16,
    },
});