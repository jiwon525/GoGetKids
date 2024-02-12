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
      {external_id: { 
        $convert:
         {
            input: "$external_id",
            to: "objectId",
         } 
        
      }}
    ];
    const externalId = await db.collection("customUserData").aggregate(pipeline);
    const userDetails = await db.collection("users").findOne({ externalId });
    // If aggregation result is empty, return an error
    if (userDetails.length === 0) {
      return { error: "User not found in database!" };
    }
    
    return { userDetails };
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};
