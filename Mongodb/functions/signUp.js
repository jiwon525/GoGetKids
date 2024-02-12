exports = async function(payload) {
    try {
        // Extract the body object from the payload
        const body = payload && payload.body;

        // If body exists, decode the Data property
        if (body && body.Data) {
            // Decode the base64 encoded string to get the user data
            const userDataString = Buffer.from(body.Data, 'base64').toString('utf-8');
            const userData = JSON.parse(userDataString);

            // Now you can access the user data properties
            const { email, firstName, lastName, password, phoneNum, role} = userData;
            // Additional properties like school_name and company_name can be accessed similarly

            // Debugging: Log the extracted user data
            console.log("User Data:", userData);

            // Proceed with your function logic here, such as validation, hashing password, etc.
            // Ensure to return the appropriate response based on the operation's success or failure
        } else {
            // Return an error response if the payload body or Data property is missing
            return { error: "Invalid payload format" + payload.body+payload+body};
        }
    } catch (error) {
        // Handle any errors that occur during processing
        console.error("Error:", error.message);
        return { error: "Internal server error" };
    }
};
