exports = async function(payload) {
  const { email, password } = payload;
  
  const mongodb = context.services.get("mongodb-atlas");
  await app.emailPasswordAuth.registerUser({ email, password });
  
  try {
    // Register user
    const registrationResult = await auth.register({ email, password });
    
    // Log in the user if registration is successful
    if (registrationResult.success) {
      await auth.login(email, password);
    }
    
    return registrationResult.success;
  } catch (error) {
    console.error("Error registering or logging in user:", error);
    return false;
  }
};
