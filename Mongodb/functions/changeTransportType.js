exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { _id } = body;
    if (!_id) {
      return { error: "schedule id does not exist. id:  " + _id};
    }
    const nid = new BSON.ObjectId(_id)
    
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "schedules";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findResult;
    try {
      // Find the document by _id
      findResult = await collection.findOne({ _id: nid });
      if (!findResult) {
        return { error: "Document not found for _id: " + _id };
      }

      // Define the update operation
      const update = { $set: { transport_type: 'Parent' } };
      
      // Execute the update operation
      const updateResult = await collection.updateOne({ _id: nid }, update);
      if (updateResult.modifiedCount === 1) {
        return { findResult };
      } else {
        return { error: "Failed to update document" };
      }
    } catch (err) {
      console.error("Error occurred while executing find or update:", err.message);
      return { error: err.message };
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return { error: "Internal server error" };
  }
};