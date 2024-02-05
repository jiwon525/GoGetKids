/*import React, { useState, useEffect } from 'react';
import { createPool } from '@vercel/postgres';

import { POSTGRES_URL } from '@env';
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
//const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')
import testFetchStudents from '../../api/testFetchStudents'
/*const pool = createPool({
    connectionString: POSTGRES_URL,
});

useEffect(() => {
    const fetchStudents = async () => {
        try {
            const { rows } = await pool.sql`SELECT id, firstname, lastname FROM students;`;
            setStudents(rows);
            console.log(rows);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    fetchStudents();
}, []);

const [students, setStudents] = useState([]);
    console.log(process.env.POSTGRES_URL);
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
    }, []);

    return (
        <div>
            <h1>Student List</h1>
            <ul>
                {students.map((student) => (
                    <li key={student.id}>
                        ID: {student.id}, Name: {student.firstname} {student.lastname}
                    </li>
                ))}
            </ul>
        </div>
*/

/*
const Test = () => {
    return (testFetchStudents

    );
};


export default Test;
*/