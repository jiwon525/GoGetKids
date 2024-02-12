import React, { useEffect, useState } from 'react';
import { Image } from "react-native";
import {
    StyledContainer,
    InnerContainer,
    NormText, HomeImage,
} from '../components/styles';
import Card from '../components/Card';
import ProfileTop from '../components/ProfileTop';
import { fetchUserData } from '../components/schema';

const HomeScreen = ({ navigation, route }) => {
    const { userId, accessToken, refreshToken } = route.params;
    const [students, setStudents] = useState([]);
    const [userDetail, setUserDetail] = useState({
        _id: null,
        email: '',
        firstName: '',
        lastName: '',
        phoneNum: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDetails = await fetchUserData(userId, accessToken);
                setUserDetail(userDetails);
                const email = userDetails.email
                console.log("Userdetails in homescreen", userDetails);
                const parent_id = {
                    email: email,
                };
                const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/getParentStudents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                    body: JSON.stringify(parent_id),
                });
                const responseBody = await response.json();
                console.log("responseBody: ", responseBody);
                if (!response.ok) {
                    console.error('Error fetching data. Status:', response.status);
                    // Handle the error here, maybe return a specific error message or throw an error
                } else {
                    setStudents(responseBody.result || []);
                    console.log(responseBody.result);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Call the fetchData function to fetch data from the backend
    }, []); // Run once

    return (
        <StyledContainer>
            <ProfileTop name="Home" />
            <InnerContainer>
                {students.map((student, index) => (
                    <Card
                        key={index}
                        firstName={student.firstname}
                        lastName={student.lastname}
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
