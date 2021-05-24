import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField
} from "@material-ui/core";
import { useSelector } from "react-redux";
import shopAPI from "../../api/shop";
const SettingsPassword = (props) => {
  const state = useSelector((state) => state);
  const shop = state.entities.shop.data;
  const shopId = shop._id;
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    password: "",
    confirm: ""
  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const updatePassword = async () => {
    const { password, confirm } = values;
    console.log("Data for update Api", password, confirm);
    if (password !== confirm) return alert("Password do not match");
    const result = await shopAPI.updateShopPassword(shopId, password);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setIsLoading(false);
  };

  return (
    <form {...props}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            onChange={handleChange}
            type="password"
            value={values.confirm}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2
          }}
        >
          <Button color="primary" variant="contained" onClick={updatePassword}>
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default SettingsPassword;
