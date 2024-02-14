exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { driver_email } = body;
    if (!driver_email) {
      return { error: "student id is " + driver_email};
    }
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "trips";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findResult;
    try {
      //later need to edit this part to find and set into array.
      findResult = await collection.findOne({driver_email: driver_email});
      return { findResult }; 
    } catch(err) {
      console.log("Error occurred while executing find:", err.message);
      return { error: err.message };
    }
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};