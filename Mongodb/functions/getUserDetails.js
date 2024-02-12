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
    
    // Define aggregation pipeline to convert external_id to ObjectId
    const pipeline = [
      {
        $match: {
          _id: userID.external_id
        }
      },
      {
        $project: {
          _id: {
            $convert: {
              input: "$_id",
              to: "objectId",
              onError: "Error"
            }
          }
        }
      }
    ];
    
    // Execute aggregation pipeline
    const aggregationResult = await db.collection("users").aggregate(pipeline).toArray();
    
    // If aggregation result is empty, return an error
    if (aggregationResult.length === 0) {
      return { error: "User not found in database!" };
    }
    
    // Extract user details from aggregation result
    const userDetails = aggregationResult[0];
    
    return { userDetails };
  } catch (error) {
    console.error("Error finding user:", error);
    return { error: "Internal server error" };
  }
};
