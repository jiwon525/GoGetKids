exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { vehicle_number, driver_email, date } = body;
    if (!vehicle_number || !driver_email) {
      return { error: "data does not exist. id:  " + driver_email };
    }
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collName = "trips";
    var collection = context.services.get(serviceName).db(dbName).collection(collName);
    var findResult;
    try {
      // Find the document by _id
      findResult = await collection.findOne({ driver_email: driver_email, date: date});
      if (!findResult) {
        return { error: "Document not found for studentid: " + driver_email };
      }
      const now = new Date();
      const timeZone = 'Asia/Singapore';
      const timeSGT = new Intl.DateTimeFormat('en-SG', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: timeZone
      }).format(now);
      const update = { $set: { start_time: timeSGT } };
      const updateResult = await collection.updateOne( {driver_email: driver_email, date: date}, update);
      if (updateResult.modifiedCount === 1) {
        return;
      } else {
        return { error: "Failed to update document" };
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