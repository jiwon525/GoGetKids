exports = async function (payload) {
  try {
    if (request.body === undefined) {
      throw new Error(`Request body was not defined.`);
    }
    const body = JSON.parse(request.body.text());
    const {
      email,
      password,
    } = body;
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
      return {id: user._id.toString()};
    } else {
      // Passwords do not match, return an error
      return { error: "Invalid password" };
    }
  } catch (error) {
    console.error("Error signing in user:", error);
    return { error: "Internal server error" };
  }
};
