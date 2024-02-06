export default async function signUp(userData, navigation) {
    try {
        console.log(userData);
        Register(userData.email, userData.password);
        const response = await fetch('https://ap-southeast-1.aws.data.mongodb-api.com/app/gogetkidsmobile-csapx/endpoint/signUp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (response.ok) {
            const data = await response.json();
            if (typeof data === 'boolean' && data === true) {
                // Handle successful registration
                navigation.navigate("Login");
            } else {
                console.error('Error registering user:', data.error || "Unknown error");
            }
        } else {
            const errorData = await response.json();
            console.error('Error registering user:', errorData.error || "Unknown error");
        }
    } catch (error) {
        console.error('Error:', error.message || "Unknown error");
        // Handle network or other errors
    }
};


export default async function Register({ email, password }) {
    const { result, register } = useEmailPasswordAuth();
    register({ email, password });
    // Log in the user after successful registration
    if (result.success && result.operation === AuthOperationName.Register) {
        console.log("success logging in");
        Login({ email, password });
    }
};

export default async function Login({ email, password }) {
    const { logIn } = useEmailPasswordAuth();
    logIn({ email, password });
}