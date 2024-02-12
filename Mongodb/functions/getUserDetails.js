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
    
    let id = userID.external_id;
    const nid = new BSON.ObjectId(id)
    const userDetails = await db.collection("users").findOne({ _id: nid });
    // If aggregation result is empty, return an error
    if (!userDetails) {
      return { error: "User not found in database!" + nid};
    }
    return { userDetails };
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};
