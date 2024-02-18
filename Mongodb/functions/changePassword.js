exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { _id, password } = body;
    // Fetch user from the database based on id
    const db = context.services.get("mongodb-atlas").db("GoGetKids");
    // Hash the password
    const hashedPassword = await context.functions.execute(
      "bcryptHash",
      password
    );
    // Check if hashing was successful
    if (!hashedPassword) {
      return { error: "Error hashing password" };
    }
    let id = new BSON.ObjectId(_id)
    // Execute the update operation
    const updateResult = await db.collection("users").updateOne(
      { _id: id },
      { $set: { password: hashedPassword } }
    );
    console.log(updateResult.modifiedCount);
    // Check the result of the update operation
    if (updateResult.modifiedCount === 1) {
      return { success:true };
    } else {
      return { error: "Failed to update password" };
    }
      
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};
