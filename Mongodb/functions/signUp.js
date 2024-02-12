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
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "students";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findUser;
    findUser = await collection.findOne({email});
    if(!findUser){
      try{const result = await collection.insertOne(user);
        return true
      }catch(error){
        return false
      }
    }else{
      console.error("User already exists", error);
      return false;
    }
  } catch (error) {
    console.error("Error registering user:", error);
    return false; // Return false in case of any errors
  }
};
