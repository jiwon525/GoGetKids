
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

const StudentListScreen = () => {
    const [students, setStudents] = useState([]);

    // Update the Axios request in your React Native code
    useEffect(() => {
        axios.get('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/getStudents')
            .then(response => setStudents(response.data))
            .catch(error => console.error(error));
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Student List</Text>
            <FlatList
                data={students}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.firstname}</Text>
                        <Text>{item.gender}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    item: {
        marginBottom: 8,
    },
});

export default StudentListScreen;

