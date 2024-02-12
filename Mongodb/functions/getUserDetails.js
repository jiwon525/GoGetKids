exports = async function (payload) {
  try {
    var body = JSON.parse(payload.body.text());
    const {
      _id
    } = body;
    // Fetch user from the database based on id
    const user = await context.services
      .get("mongodb-atlas")
      .db("GoGetKids")
      .collection("users")
      .findOne({ _id });
    // If user not found, return an error
    if (!user) {
      return { error: "User not found" };
    }
    return {user};
  } catch (error) {
    console.error("Error finding user:", error);
    return { error: "Internal server error" };
  }
};
