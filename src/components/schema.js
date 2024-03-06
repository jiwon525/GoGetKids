import { format } from '@expo/config-plugins/build/utils/XML';
import { router } from 'expo-router';
import moment from 'moment';
import StudentDetails from './StudentDetails';
import ScheduleDetails from './ScheduleDetails';
import TripDetails from './TripDetails';

//signing user up at mongodb atlas function
export async function signUp(details) {
    try {
        console.log("email and other signup stuff", details);
        const userData = {
            email: details.email,
            firstName: details.firstName,
            lastName: details.lastName,
            password: details.password,
            phoneNum: details.phoneNum,
            role: "parent"
        };
        console.log(userData);
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
            } else {
                console.error(responseBody.error);
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

//changing user password using user id

//fetching user data using external user id
export async function changepassword(userId, newpassword, accessToken) {
    try {
        const userupdate = {
            _id: userId,
            password: newpassword,
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/changePassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(userupdate),
        });
        if (response.ok) {
            return;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null or throw an error based on your app's logic
    }
};

//fetching student schedules using student id
export async function fetchSchedule(studentId, accessToken) {
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
        //console.log("the array of fetchstchedule", responseBody.findResult);
        const scheduleDetails = responseBody.findResult || [];
        return scheduleDetails;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null or throw an error based on your app's logic
    }
};

//setting up the function to call trip data for driver
export async function loadTrips(email, accessToken) {
    try {
        console.log("inside load trip");
        const fetchedTrip = await fetchDriverTrips(email, accessToken);
        const tripArray = fetchedTrip.map(trip =>
            new TripDetails(
                trip._id,
                trip.tripId,
                trip.vehicle_number,
                trip.driver_email,
                trip.company_name,
                trip.date,
                trip.school_name,
                trip.zone,
                trip.start_time,
                trip.end_time
            )
        );
        console.log("this is trip loaded", tripArray);
        const getStudents = await fetchTripStudents(tripArray[0].school_name, tripArray[0].zone, accessToken);
        const studentArray = getStudents.map(student =>
            new StudentDetails(
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
                student.zone
            )
        );
        console.log("fetched trip array", tripArray);
        console.log("fetched student array", studentArray);
        return { tripArray, studentArray };
    } catch (error) {
        console.log("error at load trips & students");
    }
};


//setting up the function to load student data from mongodb to parent session
export async function loadStudents(email, accessToken) {
    try {
        const fetchedStudentDetails = await fetchStudentData(email, accessToken);
        const studentDetailsArray = fetchedStudentDetails.map(student =>
            new StudentDetails(
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
                student.zone
            )
        );
        const schedulesPromises = studentDetailsArray.map(async (student) => {
            const s = await fetchSchedule(student.studentid, accessToken);
            console.log(s);
            return s.map(schedule =>
                new ScheduleDetails(
                    schedule._id,
                    schedule.date,
                    student.firstname,
                    student.lastname,
                    schedule.school_name,
                    student.class_name,
                    student.status,
                    student.studentid,
                    schedule.transport_type,
                    schedule.pickup_time,
                    schedule.dismissal_time
                )
            );
        });
        const resolvedSchedules = await Promise.all(schedulesPromises);

        return { studentDetailsArray, resolvedSchedules };
    } catch (error) {
        console.log("error at load students");
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
        } else {
            const tripData = responseBody.result || [];
            console.log("this is trip", tripData);
            return tripData;
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
//fetch students inside the trip assigned to driver
export async function fetchTripStudents(school_name, zone, accessToken) {
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
        if (!response.ok) {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        } else {
            const tripstudents = responseBody.result || []; // Assigning the result array
            console.log("the return array from fetch trip students", tripstudents);
            return tripstudents;
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

//fetch students in the same class as teacher
export async function fetchTeacherStudents(teacherid, accessToken) {
    console.log("sch name", teacherid);
    try {
        const teac = {
            teacherid: teacherid,
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/getTeacherStudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(teac),
        });
        const responseBody = await response.json();
        console.log("trip students", responseBody);
        if (!response.ok) {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        } else {
            const teachStud = responseBody.result || []; // Assigning the result array
            console.log("the return array", teachStud);
            return teachStud;
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};


//updating the status of students of parents drop off
export async function changeStatusSchool(studentid, school_name, accessToken) {
    console.log("inside change status type school");
    try {
        const statusUpdate = {
            studentid: studentid,
            school_name: school_name
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/changeStatusSchool', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(statusUpdate),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        }
        return;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};
export async function changeStatusDriver(studentid, vehicle_number, accessToken) {
    console.log("inside change status driver type");
    try {
        const statusUpdateD = {
            studentid: studentid,
            vehicle_number: vehicle_number
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/changeStatusDriver', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(statusUpdateD),
        });
        const responseBody = await response.json();
        console.log(" students", responseBody.updateResult);
        if (!response.ok) {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        }
        return;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export async function changeStatusTeacher(vehicle_number, studentid, accessToken) {
    try {
        const teac = {
            vehicle_number: vehicle_number,
            studentid: studentid
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/changeStatusTeacher', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(teac),
        });
        const responseBody = await response.json();
        console.log("trip students", responseBody);
        if (!response.ok) {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        } else {
            const teachStud = responseBody.result || []; // Assigning the result array
            console.log("the return array", teachStud);
            return teachStud;
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export async function putTripStart(vehicle_number, driver_email, date, accessToken) {
    console.log("inside change trip driver type");
    try {
        const tripUpdateD = {
            vehicle_number: vehicle_number,
            driver_email: driver_email,
            date: date
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/putTripStart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(tripUpdateD),
        });
        const responseBody = await response.json();
        console.log(" trip of putTripStart", responseBody);
        if (!response.ok) {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        }
        return;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};

export async function putTripEnd(vehicle_number, driver_email, date, accessToken) {
    console.log("inside change trip driver type");
    try {
        const tripUpdateD = {
            vehicle_number: vehicle_number,
            driver_email: driver_email,
            date: date
        };
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/putTripEnd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify(tripUpdateD),
        });
        const responseBody = await response.json();
        console.log(" trip end gives this result", responseBody.updateResult);
        if (!response.ok) {
            throw new Error('Failed to fetch data. Status: ' + response.status);
        }
        return;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
};