import axios from 'axios';

const API_BASE_URL = 'https://gogetkids-dashboard.vercel.app';

const fetchData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/students`);
        console.log('Data:', response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

fetchData();
