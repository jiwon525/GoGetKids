exports = async function(payload) {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      phoneNum,
      role,
      schoolID,
      companyID
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
      schoolID: role === "teacher" ? schoolID : undefined,
      companyID: role === "driver" ? companyID : undefined
    };

    // Connect to MongoDB and insert the user
    const result = await context.services
      .get("mongodb-atlas")
      .db("GoGetKids")
      .collection("users")
      .insertOne(user);

    // Respond with success or any other relevant information
    return { message: "User registered successfully", user };
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Internal server error" };
  }
};
