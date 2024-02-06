exports = async function(payload) {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      phoneNum,
      role,
      school_name,
      company_name
    } = payload;
    
    const app = await context.services.get("gogetkidsmobile-csapx");
    await app.emailPasswordAuth.registerUser({ email, password });
    app.emailPasswordAuth.logIn({email, password})

    // Call the addData function and pass the payload
    const result = await context.functions.execute("addData", payload);
    
    return result;
  } catch (error) {
    console.error("Error registering user:", error);
    return false; // Return false in case of any errors
  }
};