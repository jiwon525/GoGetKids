exports = async function (payload) {
  try {
    if (!payload || !payload.body || !payload.body.email) {
      return { error: "Payload or email is undefined or null" + payload.body + "email: "+ payload.body.email};
    }
    const email = payload.body.email;
    if (!email) {
      return { error: "Email is undefined or null " + email+ body};
    }
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "students";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findResult;
    try {
      findResult = await collection.find({parent_id: email}).toArray();
      return { result: findResult };
    } catch(err) {
      console.log("Error occurred while executing find:", err.message);
      return { error: err.message };
    }
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};
