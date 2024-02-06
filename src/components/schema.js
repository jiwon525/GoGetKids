

export default async function signUp(userData, navigation) {
    try {
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        if (response.ok) {
            if (data.error) {
                console.error('Error registering user:', data.error);
            } else {
                navigation.navigate("Login");
            }
        } else {
            console.error('Error registering user:', data);
        }
    } catch (error) {
        console.error('Error:', error);
        // Handle network or other errors
    }
};
