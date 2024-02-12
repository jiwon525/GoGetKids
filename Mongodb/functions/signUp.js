exports = async function(payload) {
  try {
    const body = payload && payload.body;

    if (body) {
      const userDataString = Buffer.from(body, 'base64').toString('utf-8');
      const userData = JSON.parse(userDataString);
      
      // Now you can access the user data properties
      const { email, firstName, lastName, password, phoneNum, role } = userData;

      // Proceed with your function logic here

      return { success: true };
    } else {
      return { error: "Invalid payload format" };
    }
  } catch (error) {
    console.error("Error:", error.message);
    return { error: "Internal server error" };
  }
};
