exports = async function (email) {
  try {
    const id = JSON.parse(email.body.Data);
    if (!id) {
      return { error: "Email is undefined or null " + id};
    }
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "students";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findResult;
    try {
      findResult = await collection.find({parent_id: id}).toArray();
      return { result: findResult };
    } catch(err) {
      console.log("Error occurred while executing find:", err.message);
      return { error: err.message };
    }
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};
