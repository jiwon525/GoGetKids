exports = async function(payload) {
  const { email, password } = payload;
  const { logIn, register } = context.services.get("mongodb-atlas").app("gogetkidsmobile-csapx").useEmailPasswordAuth();
  
  try {
    // Register user
    const registrationResult = await register({ email, password });
    
    // Log in the user if registration is successful
    if (registrationResult.success) {
      await logIn({ email, password });
    }
    
    return registrationResult.success;
  } catch (error) {
    console.error("Error registering or logging in user:", error);
    return false;
  }
};