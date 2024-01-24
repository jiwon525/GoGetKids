import React, { useState, useEffect } from 'react';
import { createPool } from '@vercel/postgres';
import 'react-native-url-polyfill/auto'

const config = require('../components/config');

const pool = createPool({
    connectionString: config.POSTGRES_URL
});

const TestScreen = () => {
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
    );
};

export default TestScreen;
