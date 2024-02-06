exports = async function(payload) {
  try {
    const { email, password } = payload;

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
    console.log(user.email);
    console.log(email);
    console.log(user.password);
    console.log(password);
    console.log(user.firstname);
    console.log(user.lastname);
    // Compare provided password with stored hashed password
    const passwordMatch = await context.functions.execute(
      "bcryptCompare",
      password,
      user.password
    );

    if (passwordMatch) {
      // Passwords match, user is successfully signed in
      return { message: "User signed in successfully", user };
    } else {
      // Passwords do not match, return an error
      return { error: "Invalid password" };
    }
  } catch (error) {
    console.error("Error signing in user:", error);
    return { error: "Internal server error" };
  }
};
