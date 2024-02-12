exports = async function (payload) {
  try {
    
    const userFromHttp = await context.http.post({
    url: "https://services.cloud.mongodb.com/api/client/v2.0/app/gogetkidsmobile-csapx/auth/providers/custom-function/login",
    headers: {
      Authorization: ["Basic bmlja0BleGFtcGxlLmNvbTpQYTU1dzByZA=="],
    },
    body: payload,
  });
  
  if (userFromHttp.status === 200) {
    const responseBody = await userFromHttp.json();
      if (responseBody.id) {
        return responseBody.id;
      } else {
        console.error("Response body doesn't contain user ID:", responseBody);
        return { error: "User ID not found in response" };
      }
    } else {
      return { error: "Authentication failed" + userFromHttp.body.text()};
    }
  } catch (error) {
    return { error: "Internal server error" };
  }
};
