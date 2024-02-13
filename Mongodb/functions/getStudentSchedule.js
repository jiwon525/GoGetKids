exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { studentid } = body;
    const studentIdInt = parseInt(studentid);
    if (!studentid) {
      return { error: "student id is " + studentid};
    }
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "schedules";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findResult;
    try {
      findResult = await collection.findOne({studentid: studentIdInt});
      return { findResult, studentIdInt };
    } catch(err) {
      console.log("Error occurred while executing find:", err.message);
      return { error: err.message };
    }
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};
