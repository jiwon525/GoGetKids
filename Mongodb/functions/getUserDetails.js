exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { _id } = body;
    
    // Fetch user from the database based on id
    const db = context.services.get("mongodb-atlas").db("GoGetKids");
      
    const userID = await db.collection("customUserData").findOne({ user_id: _id });
    
    // If user not found, return an error
    if (!userID) {
      return { error: "User not registered!" };
    }
    
    const aggregationPipeline = [
      {
        $match: {
          "_id": { $toObjectId: userID.external_id } // Convert external_id to ObjectId
        }
      }
    ];

    const userDetails = await db.collection("users").aggregate(aggregationPipeline).toArray();

    if (userDetails.length === 0) {
      return { error: "User not in database!" + userID.external_id + userDetails };
    }

    return { userDetails };
  } catch (error) {
    console.error("Error finding user:", error);
    return { error: "Internal server error" };
  }
};
