exports = async function(payload) {
 
  try {
    var body = JSON.parse(payload.body.text())
    const {
      email,
      firstName,
      lastName,
      password,
      phoneNum,
      role,
      school_name="",
      company_name="",
      license="",
    } = body;
    // Validate email address
    if (!email || typeof email !== 'string' || email.trim() === '') {
      return {error: "Invalid email address: "+email};
    }
    
    // Hash the password
    const hashedPassword = await context.functions.execute(
      "bcryptHash",
      password
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
      school_name,
      company_name
    };

    // MongoDB collection information
    const serviceName = "mongodb-atlas";
    const dbName = "GoGetKids";
    const collName = "users";
    const collection = context.services.get(serviceName).db(dbName).collection(collName);

     // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return { error: "User already exists" };
    }

    // Insert user into database
    const insertionResult = await collection.insertOne(user);
    if (insertionResult.insertedId) {
      // Debug information for successful insertion
      const debugInfo = {
        message: "User inserted successfully",
        insertedUserId: insertionResult.insertedId,
        timestamp: new Date().toISOString()
      };
      return { success: true, debug: debugInfo };
    } else {
      return { error: "Error inserting user into the database" };
    }
  } catch (error) {
    return { error: "Internal server error" };
  }
};