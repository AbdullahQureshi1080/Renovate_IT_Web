import ls from "local-storage";
import jwtDecode from "jwt-decode";
const key = "auth-token";

const storeToken = async (authToken) => {
  try {
    await ls.set(key, authToken);
  } catch (err) {
    console.log("Error storing the auth Token", err);
  }
};

const getToken = async () => {
  try {
    const authToken = await ls.get(key);
    // return JSON.parse(authToken);
    return authToken;
  } catch (err) {
    console.log("Error getting the auth Token", err);
  }
};

const removeToken = async () => {
  try {
    await ls.remove(key);
    console.log("Token Removed");
  } catch (err) {
    console.log("Error removing the auth Token", err);
  }
};

const getUser = async () => {
  const token = await getToken();
  return token ? jwtDecode(token) : null;
};

export default {
  getToken,
  getUser,
  removeToken,
  storeToken
};
