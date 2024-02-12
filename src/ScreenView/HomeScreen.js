import React, { useEffect, useState } from 'react';
import { Image } from "react-native";
import {
    StyledContainer,
    InnerContainer,
    NormText, HomeImage,
} from '../components/styles';
import Card from '../components/Card';
import ProfileTop from '../components/ProfileTop';

const HomeScreen = ({ navigation, route }) => {
    console.log('Route params:', route.params);

    const { userId, userEmail, userPW } = route.params;

    const [students, setStudents] = useState([]);

    useEffect(() => {


        const fetchData = async () => {
            try {
                const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/getParentStudents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: userEmail }), // Pass userEmail in the request body as JSON
                });
                if (response.ok) {
                    const data = await response.json();
                    setStudents(data.result || []);
                } else {
                    console.error('Error fetching data:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function to fetch data from the backend
    }, [userEmail]); // Run the effect whenever userEmail changes

    return (
        <StyledContainer>
            <ProfileTop name="Home" />
            <InnerContainer>
                {students.map((student, index) => (
                    <Card
                        key={index}
                        firstname={student.firstName}
                        lastname={student.lastName}
                        status={student.status}
                        school={student.school_name}
                        grade={student.class_name}
                        studentID={student.studentid.toString()}
                        onPress={() => navigation.navigate("Child")}
                    />
                ))}
            </InnerContainer>
            <HomeImage
                resizeMode="center" source={require('../assets/childrenhome.png')}
            />
        </StyledContainer>
    );
};

export default HomeScreen;
