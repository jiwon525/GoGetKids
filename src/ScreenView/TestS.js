import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Testscreens = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Replace 'YOUR_FUNCTION_ENDPOINT' with the actual endpoint URL
        const functionEndpoint = 'https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/getStudents';

        // Make a request to the MongoDB Realm function
        fetch(functionEndpoint)
            .then((response) => response.json())
            .then((data) => {
                // Update state with the received data
                setStudents(data.result || []);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // Empty dependency array to run the effect only once on component mount

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

export default Testscreens;
