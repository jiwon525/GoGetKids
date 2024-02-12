exports = async function(payload) {
    try {
      const userDataString = Buffer.from(payload.body.Data, 'base64').toString('utf-8');
      const userData = JSON.parse(userDataString);
      // Now you can access the user data properties
      const { email, firstName, lastName, password, phoneNum, role, school_name="", company_name="" } = userData;
      return{error:"payload"+payload.email+payload.firstName+payload.body.Data+userDataString+userData};
    } catch (error) {
        // Handle any errors that occur during processing
        console.error("Error:", error.message);
        return { error: "Internal server error" };
    }
};
