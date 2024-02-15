import { router } from 'expo-router';
import * as MailComposer from 'expo-mail-composer';
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
            company_name: responseBody.userDetails.company_name || null,
            school_name: responseBody.userDetails.school_name || null,
        };
        console.log("fetchUserdata", userDetails);
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
        let date = new Date(responseBody.findResult.date);
        //extracting data from the json $date
        let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        let pickupTime = new Date(responseBody.findResult.pickup_time);
        let dismissalTime = new Date(responseBody.findResult.dismissal_time);
        let formattedPickupTime = pickupTime.toTimeString().split(' ')[0]; // Extracting time part
        let formattedDismissalTime = dismissalTime.toTimeString().split(' ')[0]; // Extracting time part

        let scheduleDetails = {
            _id: responseBody.findResult._id,
            studentid: responseBody.findResult.studentid,
            date: formattedDate,
            transport_type: responseBody.findResult.transport_type,
            pickup_time: formattedPickupTime,
            dismissal_time: formattedDismissalTime
        };
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

export async function changeTransportType(transport, accessToken) {
    console.log("inside change transport type");
    try {
        const t = {
            _id: transport._id,

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
            let date = new Date(responseBody.findResult.date);
            //extracting data from the json $date
            let formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
            let pickupTime = new Date(responseBody.findResult.pickup_time);
            let dismissalTime = new Date(responseBody.findResult.dismissal_time);
            let formattedPickupTime = pickupTime.toTimeString().split(' ')[0]; // Extracting time part
            let formattedDismissalTime = dismissalTime.toTimeString().split(' ')[0];
            let updatedSchedule = {
                _id: responseBody.findResult._id,
                studentid: responseBody.findResult.studentid,
                date: formattedDate,
                transport_type: responseBody.findResult.transport_type,
                pickup_time: formattedPickupTime,
                dismissal_time: formattedDismissalTime
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
    console.log("inside fetch schedule");
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
        } else {
            const tripData = responseBody.findTrip || [];
            //console.log("fetch student data", studentData);
            return tripData;
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};