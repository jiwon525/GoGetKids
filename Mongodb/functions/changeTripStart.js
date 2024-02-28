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
      // Manually calculate the current time in SGT (UTC+8)
      const now = new Date();
      const utcTime = now.getTime() + now.getTimezoneOffset() * 60000; // Convert local time to UTC
      const sgtTime = new Date(utcTime + (3600000 * 8)); // Convert UTC to SGT (UTC+8)

      // Format the SGT time as a string like "16:00"
      const formattedTime = sgtTime.getUTCHours().toString().padStart(2, '0') + ":" + sgtTime.getUTCMinutes().toString().padStart(2, '0');
      const update = { $set: { start_time: formattedTime } };
      const updateResult = await collection.updateOne( {driver_email: driver_email, date: date}, update);
      if (updateResult.modifiedCount === 1) {
        return updateResult;
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