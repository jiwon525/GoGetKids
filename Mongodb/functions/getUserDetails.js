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
    
    const conversion = await {$toObjectId: '$userID.external_id'};
    if (conversion){
      const userDetails = await db.collection("users").findOne({ externalId });
      if (!userDetails) {
      return { error: "User not in database!" + externalId + typeof externalId };
      }
    }else{
      return{error:"conversion error"};
    }
    
    
    return { userDetails };
  } catch (error) {
    console.error("Error finding user:", error);
    return { error: "Internal server error" };
  }
};
