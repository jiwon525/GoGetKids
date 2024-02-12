export async function signUp(userData, navigation) {
    try {
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
            if (responseBody && responseBody.success && responseBody.debug) {
                console.log('User inserted successfully:', responseBody.debug);
                // Optionally, navigate to the login screen
                // navigation.navigate("Login");
            } else {
                console.error('Error registering user: Response format is incorrect');
            }
        } else {
            const responseBody = await response.json();
            if (responseBody && responseBody.error) {
                console.error('Error registering user:', responseBody.error);
            } else {
                console.error('Error registering user: Unknown error');
            }
        }
    } catch (error) {
        console.error('Error:', error.message || "Unknown error");
        // Handle network or other errors
    }
}
