exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { _id, password } = body;
    // Fetch user from the database based on id
    const db = context.services.get("mongodb-atlas").db("GoGetKids");
    const userID = await db.collection("customUserData").findOne({ user_id: _id });
    // If user not found, return an error
    if (!userID) {
      return { error: "User not registered!" };
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
    let id = userID.external_id;
    const nid = new BSON.ObjectId(id)

    // Define the update operation to update the pw
    // Execute the update operation
    const updateResult = await usersCollection.updateOne(
      { _id: nid },
      { $set: { password: hashedPassword } }
    );
    // Check the result of the update operation
    if (updateResult.modifiedCount === 1) {
      return { message: "Password updated successfully" };
    } else {
      return { error: "Failed to update password" };
    }
      
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};
