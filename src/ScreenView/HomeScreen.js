import React, { useState, useEffect } from 'react';
import { createPool } from '@vercel/postgres';
import {
    StyledContainer,
    InnerContainer,
    ProfileTop,
    Card,
    NormText,
} from '../components/styles';
import { POSTGRES_URL } from '@env';
//regarding db
import 'react-native-url-polyfill/auto'
//import { createClient } from '@supabase/supabase-js'
//const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
const pool = createPool({
    connectionString: POSTGRES_URL,
});

const HomeScreen = ({ navigation }) => {
    /*const [students, setStudents] = useState([]);
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { rows } = await pool.sql`SELECT id, firstname, lastname FROM students;`;
                setStudents(rows);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, []);*/

    const navigateToChildScreen = () => {
        navigation.navigate('Child');
    };
    const cardData = {
        name: 'Rachel Yeo',
        status: 'In School',
        school: 'Methodist Primary School',
        grade: 'Class 1',
        studentID: 'S2301234',
    };
    const cardData2 = {
        name: 'Testing 2',
        status: 'In School',
        school: 'Morning Primary School',
        grade: 'Class 2',
        studentID: 'S2223348',
    }
    return (
        <StyledContainer>
            <ProfileTop name="Home" navigation={navigation} />
            <InnerContainer>
                <Card {...cardData} onPress={navigateToChildScreen}></Card>
                <Card {...cardData2} onPress={navigateToChildScreen}></Card>
            </InnerContainer>
        </StyledContainer>
    );
};


export default HomeScreen;
/*                {students.map((student) => (
                    <Card
                        key={student.id}
                        name={`${student.firstname} ${student.lastname}`}
                        status="In School"
                        school="Methodist Primary School"
                        grade="Class 1"
                        studentID={`S${student.id}`}
                        onPress={navigateToChildScreen}
                    />
                ))}
                <NormText>
                    {`Number of students: ${students.length}`}
                </NormText>*/