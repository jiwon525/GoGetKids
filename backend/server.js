const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8081;

// Middleware
app.use(cors());
const result = require('dotenv').config({ path: '../.env' });

if (result.error) {
    console.error('Error loading .env file:', result.error);
}

console.log('MongoDB URI:', process.env.MONGODB_URI);
mongoose.connect(
    process.env.MONGODB_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    }
)

    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB Atlas');
});

// Define the schema
const studentSchema = new mongoose.Schema({
    studentid: Number,
    firstname: String,
    lastname: String,
    gender: String,
    dob: String,
    status: String,
    postcode: Number,
    zone: String,
    address: String,
    class_id: Number,
    schoolid: String,
    parent_id: String,
});

// Create a model
const Student = mongoose.model('Student', studentSchema);

// API route to get all students
app.get('/api/students', async (req, res) => {
    console.log("at app.get");
    try {
        const students = await Student.find();
        console.log(students);
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
