export default async function signUp(userData, navigation) {
    try {
        console.log(userData);
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();
        console.log(response);
        if (response.ok) {
            if (typeof data === 'boolean' && data === true) {
                // Handle successful registration
                navigation.navigate("Login");
            } else {
                console.error('Error registering user');
            }
        } else {
            console.error('Error registering user:', data);
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network or other errors
    }
};
