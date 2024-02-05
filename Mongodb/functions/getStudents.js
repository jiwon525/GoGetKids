exports = async function() {
  var serviceName = "mongodb-atlas";
  var dbName = "GoGetKids";
  var collName = "students";

  var collection = context.services.get(serviceName).db(dbName).collection(collName);

  var findResult;
  try {
    findResult = await collection.find({}).toArray();
  } catch(err) {
    console.log("Error occurred while executing find:", err.message);
    return { error: err.message };
  }

  return { result: findResult };
};
