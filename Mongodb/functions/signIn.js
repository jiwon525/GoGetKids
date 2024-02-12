exports = async function (payload) {
  const { ObjectId } = require('mongodb');
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
    // Compare provided password with stored hashed password

    const passwordMatch = await context.functions.execute(
      "bcryptCompare",
      password,
      user.password
    );

    if (passwordMatch) {
      return { "id": user._id.toString() }
    } else {
      // Passwords do not match, return an error
      return { error: "Invalid password" };
    }
  } catch (err) {
    throw new Error(`Authentication failed with reason: ${err.message}`);
  }
};
