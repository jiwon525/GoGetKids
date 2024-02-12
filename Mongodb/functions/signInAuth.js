exports = async function (payload) {
  try {
    var body = JSON.parse(payload.body.text());
    const {
      email,
      password,
    } = body;
    const userFromHttp = await context.http.post({
    url: "https://services.cloud.mongodb.com/api/client/v2.0/app/gogetkidsmobile-csapx/auth/providers/custom-function/login",
    headers: {
      Authorization: ["Basic bmlja0BleGFtcGxlLmNvbTpQYTU1dzByZA=="],
    },
    body: JSON.stringify({ username, password }),
  });
  return userFromHttp;
  } catch (error) {
    console.error("Error signing in user:", error);
    return { error: "Internal server error" };
  }
};
