exports = async function (payload) {
  try {
    const body = JSON.parse(payload.body.text());
    const { teacherid } = body;
    if (!teacherid) {
      return { error: "Email is undefined or null " + teacherid};
    }
    // Fetch class from the database based on teacherid
    const db = context.services.get("mongodb-atlas").db("GoGetKids");
    const classDetails = await db.collection("classes").findOne({ teacherid: teacherid });
    if (!classDetails) {
      return { error: "Teacher has no linked class " + teacherid};
    }
    var findResult;
    try {
      findResult = await db.collection("students").find({class_name: classDetails.class_name}).toArray();
      return { result: findResult };
    } catch(err) {
      console.log("Error occurred while executing find:", err.message);
      return { error: err.message };
    }
  } catch (error) {
    return { error: "Internal server error" + error };
  }
};
