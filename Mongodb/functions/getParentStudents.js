exports = async function (payload) {
  try {
    const email = payload;
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
