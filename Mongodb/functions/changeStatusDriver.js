exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { studentid, vehicle_number } = body;
    if (!vehicle_number || !studentid) {
      return { error: "data does not exist. id:  "+studentid};
    }
    const studentIdInt = parseInt(studentid);
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "students";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findResult;
    findResult = await collection.findOne({ studentid: studentIdInt });
    if (!findResult) {
      return { error: "Document not found for studentid: " + studentIdInt };
    }
    if(findResult.status==="At Home"||findResult.status === undefined){
      const update = { $set: { status: 'In Transit to School' } };
      const updateResult = await collection.updateOne({ studentid: studentIdInt }, update);
      }else{
        const update = { $set: { status: 'At Home' } };
        const updateResult = await collection.updateOne({ studentid: studentIdInt }, update);
      }
  } catch (error) {
    console.error("Internal server error:", error);
    return { error: "Internal server error" };
  }
};