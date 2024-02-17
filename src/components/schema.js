import { format } from '@expo/config-plugins/build/utils/XML';
import { router } from 'expo-router';

//signing user up at mongodb atlas function
export async function signUp(email, firstName, lastName, password, phoneNum) {
    try {
        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            phoneNum: phoneNum,
            role: "parent"
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const responseBody = await response.json();
            //console.log(responseBody);
            if (responseBody.success && responseBody.debug) {
                console.log('User inserted successfully:', responseBody.debug);
                router.replace("/");
            } else {
                console.error('Error registering user: Response format is incorrect');
            }
        } else {
            const responseBody = await response.json();
            if (responseBody.error) {
                console.error('Error registering user:', responseBody.error);
            } else {
                console.error('Error registering user: Unknown error');
            }
        }
    } catch (error) {
        console.error('Error:', error.message || "Unknown error");
        // Handle network or other errors
    }
};

//fetching user data using external user id
export async function fetchUserData(userId, accessToken, refreshToken) {
    try {
        const userID = {
            _id: userId,
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/getUserDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(userID),
        });
        const responseBody = await response.json();
        let userDetails = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            _id: responseBody.userDetails._id,
            email: responseBody.userDetails.email,
            firstName: responseBody.userDetails.firstName,
            lastName: responseBody.userDetails.lastName,
            phoneNum: responseBody.userDetails.phoneNum,
            role: responseBody.userDetails.role,
            license: responseBody.userDetails.license || null,
            company_name: responseBody.userDetails.company_name || null,
            school_name: responseBody.userDetails.school_name || null,
        };
        return userDetails;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null or throw an error based on your app's logic
    }
};

//fetching student schedules using student id
export async function fetchSchedule(studentId, accessToken) {
    console.log("inside fetch schedule");
    try {
        const studentID = {
            studentid: studentId,
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/getStudentSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(studentID),
        });
        const responseBody = await response.json();
        console.log(responseBody.findResult);
        let scheduleDetails = {
            _id: responseBody.findResult._id,
            studentid: responseBody.findResult.studentid,
            school_name: responseBody.findResult.school_name,
            date: responseBody.findResult.date,
            transport_type: responseBody.findResult.transport_type,
            pickup_time: responseBody.findResult.pickup_time,
            dismissal_time: responseBody.findResult.dismissal_time,
        };
        console.log(responseBody);
        return scheduleDetails;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null or throw an error based on your app's logic
    }
};

//fetching student data using parent email
export async function fetchStudentData(email, accessToken) {
    try {
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
        if (!response.ok) {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        } else {
            const studentData = responseBody.result || []; // Assigning the result array to studentData
            //console.log("fetch student data", studentData);
            return studentData;
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

//updating the transport type of selected student to parent pick up (havent add yet: or guardian pick up), and returning schedule
export async function changeTransportType(transport, accessToken) {
    console.log("inside change transport type");
    try {
        const t = {
            _id: transport,
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/changeTransportType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(t),
        });

        const responseBody = await response.json();
        console.log(responseBody);
        if (!response.ok) {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        } else {
            let updatedSchedule = {
                _id: responseBody.findResult._id,
                studentid: responseBody.findResult.studentid,
                school_name: responseBody.findResult.school_name,
                date: responseBody.findResult.date,
                transport_type: responseBody.findResult.transport_type,
                pickup_time: responseBody.findResult.pickup_time,
                dismissal_time: responseBody.findResult.dismissal_time,
            };
            return updatedSchedule;
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

//fetching trips using driver email
export async function fetchDriverTrips(driver_email, accessToken) {
    console.log("inside fetch trip");
    try {
        const driver = {
            driver_email: driver_email,
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/getDriverTrip', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(driver),
        });
        const responseBody = await response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        } else if (!responseBody.findTrip) { // Check if findTrip is present
            console.error('No trip data found in response');
            return null; // Return null or an appropriate default object
        } else {
            let trip = {
                _id: responseBody.findTrip._id,
                tripId: responseBody.findTrip.tripId,
                vehicle_number: responseBody.findTrip.vehicle_number,
                driver_email: responseBody.findTrip.driver_email,
                company_name: responseBody.findTrip.company_name,
                school_name: responseBody.findTrip.school_name,
                zone: responseBody.findTrip.zone,
                start_time: responseBody.findTrip.start_time || null,
                end_time: responseBody.findTrip.end_time || null,
            }
            console.log("this is trip", trip);
            return trip;
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export async function fetchTripStudents(school_name, zone, accessToken) {
    console.log("sch name", school_name, "zone", zone);
    try {
        const stud = {
            school_name: school_name,
            zone: zone,
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/getDriverStudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(stud),
        });
        const responseBody = await response.json();
        console.log("trip students", responseBody);
        if (!response.ok) {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        } else {
            const tripstudents = responseBody.result || []; // Assigning the result array
            console.log("the return array", tripstudents);
            return tripstudents;
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};