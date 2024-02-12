exports = async function(payload) {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      phoneNum,
      role,
      school_name="",
      company_name=""
    } = payload;
    
    // Hash the password
    const hashedPassword = await context.functions.execute(
      "bcryptHash",
      password
    );
    // Check if hashing was successful
    if (!hashedPassword) {
      return { error: "Error at hash func" };
    }
    // Construct user object based on role
    const user = {
      email,
      firstName,
      lastName,
      password: hashedPassword,
      phoneNum,
      role,
      school_name: school_name,
      company_name: company_name
    };
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "students";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findUser;
    findUser = await collection.findOne({email});
    if(findUser === null){
      try {
        const result = await collection.insertOne(user);
        return true;
      } catch(error) {
        return { error: "Error inserting user into the database" };
      }
    } else {
      return { error: "User already exists" };
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return { error: "Internal server error" };
  }
};
