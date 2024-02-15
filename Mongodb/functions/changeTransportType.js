exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { _id } = body;
    if (!_id) {
      return { error: "schedule id does not exist. id:  " + _id};
    }
    
    let id = userID.external_id;
    const nid = new BSON.ObjectId(id)
    
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "schedules";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findResult;
    try {
      findResult = await collection.findOne({_id: nid});
      const update = { $set: { transport_type: 'Parent' } };
    } catch(err) {
      console.log("Error occurred while executing find or update:", err.message);
      return { error: err.message };
    }
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};
