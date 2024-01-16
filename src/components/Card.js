import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from "react-native";
import React from "react";

import {
    Colors,
} from '../components/styles';

export default function Card() {
    return (
        <TouchableOpacity style={styles.container}>
            <TouchableOpacity style={styles.logoContainer}>
                <Image
                    resizeMode="contain" source={require('../assets/student.png')}
                    style={styles.logImage}
                />
            </TouchableOpacity>

            <View style={styles.textContainer}>
                <Text style={styles.jobName} numberOfLines={1}>
                    Rachel Yeo
                </Text>

                <Text style={styles.jobType}>Methodist Primary School</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        alignItems: "center",
    },
    container: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: 16,
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
    jobName: {
        fontSize: 16,
        //fontFamily: "DMBold",
        color: Colors.night,
    },
    jobType: {
        fontSize: 14,
        //fontFamily: "DMRegular",
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

});
/*    cardTextTwo: {
        borderBottomColor: Colors.darkLight,
        color: Colors.darkLight,
        fontWeight: "bold",
        fontSize: 18,
        borderBottomWidth: 1,
        marginBottom: 3,
    }, this is to show a form of 'underline' to the component
*/