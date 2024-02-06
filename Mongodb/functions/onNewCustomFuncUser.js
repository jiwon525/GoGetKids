exports = async function onNewCustomFunctionUser({ user }) {

    const internalId = user.id;

    // This is the external ID returned from the authentication function
    const customFunctionIdentity = user.identities.find((id) => {
        return id.provider_type === "signIn";
    });
    const externalId = customFunctionIdentity.id;

    // Create a custom user data document for the user
    const mdb = context.services.get("mongodb-atlas");
    const users = mdb.db("GoGetKids").collection("customUserData");
    return await users.insertOne({
        user_id: internalId,
        external_id: externalId,

    });
};
