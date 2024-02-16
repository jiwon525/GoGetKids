exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { school_name, zone } = body;
    if (!email) {
      return { error: "Email is undefined or null " + email};
    }
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "students";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findDriverStu;
    try {
      findDriverStu = await collection.find({school_name: school_name,
        zone: zone
      }).toArray();
      return { result: findDriverStu };
    } catch(err) {
      console.log("Error occurred while executing find:", err.message);
      return { error: err.message };
    }
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};
