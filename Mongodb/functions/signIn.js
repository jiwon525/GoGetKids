exports = async function (payload) {
  try {
    const {
      email,
      password,
    } = payload;
    // Fetch user from the database based on email
    const user = await context.services
      .get("mongodb-atlas")
      .db("GoGetKids")
      .collection("users")
      .findOne({ email });
    // If user not found, return an error
    if (!user) {
      return { error: "User not found" };
    }
    // Compare provided password with stored hashed password

    const passwordMatch = await context.functions.execute(
      "bcryptCompare",
      password,
      user.password
    );

    if (passwordMatch) {
      // Passwords match, user is successfully signed in
      //returns the external user for the role of the user.
      console.log(user.role);
      if (user.role === "teacher"){
        return ("65c98d06e9da0e7a09489770");
      }
      if (user.role === "driver"){
        return "65c98d340aa61926e06dc58e";
      }
      return "65c98d7c21d6ea1b2021e4b4";
    } else {
      // Passwords do not match, return an error
      return { error: "Invalid password" };
    }
  } catch (error) {
    console.error("Error signing in user:", error);
    return { error: "Internal server error" };
  }
};
