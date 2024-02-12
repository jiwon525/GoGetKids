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



export async function getParentStudents(id, navigation) {
    try {
        const userData = {
            id: id
        };
        console.log(userData);
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/getParentStudents', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        const responseBody = await response.json();
        if (response.ok) {
            console.log(responseBody);
            console.log('User logged in successfully:', responseBody.id);
            navigation.navigate("Home");
            return responseBody.id
        } else {
            if (responseBody.error) {
                console.error('Error logging in:', responseBody.error);
            } else {
                console.error('Error logging in: Unknown error');
            }
        }
    } catch (error) {
        console.error('Error:', error.message || "Unknown error");
    }
};

