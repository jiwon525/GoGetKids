exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { studentid, school_name } = body;
    if (!school_name || !studentid) {
      return { error: "data does not exist. id:  " + school_name};
    }
    const studentIdInt = parseInt(studentid);
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "students";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findResult;
    try {
      // Find the document by _id
      findResult = await collection.findOne({ studentid: studentIdInt });
      if (!findResult) {
        return { error: "Document not found for studentid: " + studentid };
      }
      if(findResult.status==="At Home"||findResult.status === undefined){
        const update = { $set: { status: 'In School' } };
        const updateResult = await collection.updateOne({ studentid: studentIdInt }, update);
        if (updateResult.modifiedCount === 1) {
          return;
        } else {
          return { error: "Failed to update document" };
        }
      }else{
        const update = { $set: { status: 'At Home' } };
        const updateResult = await collection.updateOne({ studentid: studentIdInt }, update);
        if (updateResult.modifiedCount === 1) {
          return;
        } else {
          return { error: "Failed to update document" };
        }
      }
      
    } catch (err) {
      console.error("Error occurred while executing find or update:", err.message);
      return { error: err.message };
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return { error: "Internal server error" };
  }
};