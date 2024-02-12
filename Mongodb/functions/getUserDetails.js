exports = async function (payload) {
  try {
    var body = JSON.parse(payload.body.text());
    const {
      _id
    } = body;
    // Fetch user from the database based on id
    var collection = context.services
      .get("mongodb-atlas")
      .db("GoGetKids")
      .collection("customUserData");
      
    const userID = await collection.findOne({ external_id: _id })
    // If user not found, return an error
    if (!userID) {
      return { error: "User not registered!" };
    }
    
    const userDetails = await collection.findOne(userID.user_id)
    if (!userDetails) {
      return { error: "User not registered!" };
    }
    return {userDetails};
  } catch (error) {
    console.error("Error finding user:", error);
    return { error: "Internal server error" };
  }
};
