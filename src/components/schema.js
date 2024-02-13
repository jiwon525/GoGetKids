import { router } from 'expo-router';
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
            console.log(responseBody);
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


export async function fetchSchedule(studentId, accessToken) {
    console.log("studentId", studentId)
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
        console.log(responseBody);
        let scheduleDetails = {
            _id: responseBody.scheduleDetails._id,
            studentid: responseBody.scheduleDetails.studentid,
            date: responseBody.scheduleDetails.date.$date,
            transport_type: responseBody.scheduleDetails.transport_type,
            pickup_time: responseBody.scheduleDetails.pickup_time.$date,
            dismissal_time: responseBody.scheduleDetails.dismissal_time.$date
        };
        return scheduleDetails;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null or throw an error based on your app's logic
    }
};


export async function fetchStudentData(email, accessToken) {
    console.log("the email passed into function", email)
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
            console.log("fetch student data", studentData);
            return studentData;
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
/*
return responseBody.result.map(student => new StudentDetails(
    student._id,
    student.address,
    student.class_name,
    student.dob,
    student.firstname,
    student.gender,
    student.lastname,
    student.parent_id,
    student.postcode,
    student.school_name,
    student.status,
    student.studentid,
    student.zone*/