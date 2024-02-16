exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { driver_email } = body;
    if (!driver_email) {
      return { error: "driver email is null " + driver_email};
    }
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "trips";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findTrip;
    try {
      //find the trip that is from today and before yesterday = today's date
      findTrip = await collection.findOne({driver_email: driver_email});
      return { findTrip }; 
    } catch(err) {
      console.log("Error occurred while executing find:", err.message);
      return { error: err.message };
    }
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};