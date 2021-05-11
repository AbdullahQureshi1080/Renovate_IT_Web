import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import shopAPI from "../../api/shop";
import { setShopData } from "src/store/shop";

const AccountProfileDetails = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const shop = state.entities.shop.data;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const shopId = shop._id;
  const email = shop.email;
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");

  const getShopData = async () => {
    const result = await shopAPI.getShopData(shopId);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setData(result.data);
    setImage(
      result.data.image === null
        ? "https://via.placeholder.com/150"
        : result.data.image
    );
    setIsLoading(false);
  };
  const [values, setValues] = useState({
    shopName: shop?.shopName,
    about: shop?.about,
    phoneNumber: shop?.phoneNumber,
    city: shop?.location
  });

  useEffect(() => {
    getShopData();
  }, []);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const updateShopData = async () => {
    const { shopName, city, phoneNumber, about } = values;
    console.log(
      "Data for update Api",
      shopId,
      shopName,
      city,
      phoneNumber,
      about
    );
    let data = {
      shopName,
      city,
      phoneNumber,
      about
    };
    const result = await shopAPI.updateShopData(shopId, data);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setData(result.data);
    setImage(
      result.data.image === null
        ? "https://via.placeholder.com/150"
        : result.data.image
    );
    dispatch(setShopData(data));
    setIsLoading(false);
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the Shop Name"
                label="Shop name"
                name="shopName"
                onChange={handleChange}
                required
                value={values.shopName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="About"
                name="about"
                onChange={handleChange}
                multiline
                value={values.about}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                onChange={handleChange}
                // type="number"
                value={values.phoneNumber}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="City"
                name="city"
                onChange={handleChange}
                required
                value={values.city}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2
          }}
        >
          <Button color="primary" variant="contained" onClick={updateShopData}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
