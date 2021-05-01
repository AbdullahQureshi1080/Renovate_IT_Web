import {useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import localStorage from "./storage";
import jwtDecode from "jwt-decode";
import { logout, setShopData} from "../store/shop";

const useAuth = (navigation) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

  const logIn = (authToken) => {
    const userData = jwtDecode(authToken);
    dispatch(setShopData(userData));
    localStorage.storeToken(authToken);
  };
  const logOut = () => {
    localStorage.removeToken();
    dispatch(logout());
    navigate("/", {replace:true})
  };
  return { logOut, logIn };
};

export default useAuth; 