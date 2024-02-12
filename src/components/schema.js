export async function signUp(email, firstName, lastName, password, phoneNum, navigation) {
    try {
        const userData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: password,
            phoneNum: phoneNum,
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
            console.log(responseBody);
            if (responseBody.success && responseBody.debug) {
                console.log('User inserted successfully:', responseBody.debug);
                navigation.navigate("Login");
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

export async function fetchUserData(userId, accessToken) {
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
            _id: responseBody.userDetails._id,
            email: responseBody.userDetails.email,
            firstName: responseBody.userDetails.firstName,
            lastName: responseBody.userDetails.lastName,
            phoneNum: responseBody.userDetails.phoneNum,
        };
        return userDetails;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null or throw an error based on your app's logic
    }
};