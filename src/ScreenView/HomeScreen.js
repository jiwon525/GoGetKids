import React from 'react';
import {
    StyledContainer,
    InnerContainer,
    ProfileTop,
    Card,
    NormText,
} from '../components/styles';
/*import { POSTGRES_URL } from '@env';
import { createPool } from '@vercel/postgres';
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
const pool = createPool({
    connectionString: POSTGRES_URL,
});
const [students, setStudents] = useState([]);
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



const HomeScreen = ({ navigation }) => {

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
            <ProfileTop name="Home" />
            <InnerContainer>
                <Card {...cardData} onPress={navigateToChildScreen}></Card>
                <Card {...cardData2} onPress={navigateToChildScreen}></Card>
            </InnerContainer>
        </StyledContainer>
    );
};


export default HomeScreen;
