exports = async function(payload) {
  try {
    const body = payload && payload.body;

    if (body && body.Data) {
      const userDataString = Buffer.from(body.Data, 'base64').toString('utf-8');
      const userData = JSON.parse(userDataString);
      
      // Now you can access the user data properties
      const { email, firstName, lastName, password, phoneNum, role } = userData;

      // Debugging: Log the extracted user data
      return { success: true, debug: { userData } };
    } else {
      return { error: "Invalid payload format", debug: { payload } };
    }
  } catch (error) {
    return { error: "Internal server error: " + (error.message || "Unknown error"), debug: { error } };
  }
};
