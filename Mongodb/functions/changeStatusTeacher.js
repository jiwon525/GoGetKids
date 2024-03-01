exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { vehicle_number, studentid, school_name, zone } = body;
    const studentIdInt = parseInt(studentid);
    var serviceName = "mongodb-atlas";
    var dbName = "GoGetKids";
    var collection = context.services.get(serviceName).db(dbName).collection("students");
    // Get the current date in Singapore timezone
    const sgTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Singapore"});
    const currentDate = new Date(sgTime).toISOString().slice(0, 10);
    var findResult;
    try {
      if(!vehicle_number||vehicle_number===undefined){
        // Find the document by _id
        findResult = await collection.findOne({ studentid: studentIdInt});
        if (!findResult) {
          return { error: "Document not found for studentid: " + studentIdInt };
        }
        const update = { $set: { status: 'At Home' } };
        const updateResult = await collection.updateOne({ studentid: studentIdInt }, update);
        if (updateResult.modifiedCount === 1) {
          return;
        } else {
          return { error: "Failed to update document" };
        }
      }else{
        //when vehicle is scanned.
        var vehicleUp = context.services.get(serviceName).db(dbName).collection("trips");
        // Find the trip by vehicle_number and the current date
        const trip = await tripsCollection.findOne({ vehicle_number: vehicle_number, date: currentDate });
        if (!trip) {
          return { error: "Trip not found for vehicle number: " + vehicle_number + " on date: " + currentDate };
        }
        
        // Use trip details to find students
        const studentsToUpdate = await studentsCollection.find({ school_name: trip.school_name, zone: trip.zone }).toArray();
        if (studentsToUpdate.length === 0) {
          return { error: "No students found for school: " + trip.school_name + " in zone: " + trip.zone };
        }
        
        // Update each student's status
        const updatePromises = studentsToUpdate.map(student => 
          studentsCollection.updateOne({ _id: student._id }, { $set: { status: "In transit Out of School" } })
        );
        await Promise.all(updatePromises);
  
        return { result: "Updated " + studentsToUpdate.length + " students to 'In transit Out of School'." };

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