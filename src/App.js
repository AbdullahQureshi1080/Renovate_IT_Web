import "react-perfect-scrollbar/dist/css/styles.css";
import { useRoutes, useLocation } from "react-router-dom";

import { ThemeProvider } from "@material-ui/core";
import GlobalStyles from "src/components/GlobalStyles";
import "src/mixins/chartjs";
import theme from "src/theme";
import routes from "src/routes";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import localStorage from "./hooks/storage";
import { loginShop, setShopData } from "./store/shop";
import jwtDecode from "jwt-decode";
import firebase from "firebase";
import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MEASUREMENT_ID,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET
} from "./config/config";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID
};

// let app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

firebase.firestore().settings({ experimentalForceLongPolling: true });

const App = ({}) => {
  const dispatch = useDispatch();
  // const {state} = useLocation()
  const shopUser = useSelector((state) => state.entities.shop);
  const [userToken, setUserToken] = useState(null);
  const authRouting = useRoutes(new Array(routes[0]));
  const appRouting = useRoutes(new Array(routes[1]));

  useEffect(() => {
    console.log("Store User ", shopUser);
    console.log("User Token", userToken);

    if (shopUser.token == null) {
      tryLogin();
      if (userToken) return;
      else {
        setUserToken(userToken);
        dispatch(loginShop(userToken));
      }
      return;
    } else setUserToken(shopUser.token);
  }, [shopUser.token]);

  const tryLogin = async () => {
    const token = await localStorage.getToken();
    console.log(" In try Login", token);
    if (!token) return;
    else {
      const data = jwtDecode(token);
      dispatch(loginShop(token));
      dispatch(setShopData(data));
      setUserToken(token);
      return;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {userToken ? appRouting : authRouting}
    </ThemeProvider>
  );
};

export default App;
