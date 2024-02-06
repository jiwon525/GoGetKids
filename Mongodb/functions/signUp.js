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
    
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await context.functions.execute(
      "bcryptHash",
      password,
      saltRounds
    );

    // Check if hashing was successful
    if (!hashedPassword) {
      return { error: "Error hashing password" };
    }

    // Construct user object based on role
    const user = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      phoneNum,
      role,
      school_name: (role === "teacher" || role === "schooladmin") ? school_name : undefined,
      company_name: (role === "driver" || role === "transportadmin") ? company_name : undefined
    };

    // Connect to MongoDB and insert the user
    const result = await context.services
      .get("mongodb-atlas")
      .db("GoGetKids")
      .collection("users")
      .insertOne(user);
      
    if (result) {
      await context.functions.execute(
      "signIn",
      email,
      password
      );
    }
    
    return;
  } catch (error) {
    console.error("Error registering user:", error);
    return false; // Return false in case of any errors
  }
};
