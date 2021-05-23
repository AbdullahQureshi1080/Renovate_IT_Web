import react, { useState, alert, useEffect } from "react";
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
// import * as Yup from 'yup';
// import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Avatar,
  Grid
} from "@material-ui/core";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import CategoryIcon from "@material-ui/icons/Category";

import shopAPI from "../../api/shop";
// import { Carousel } from "react-responsive-carousel";
// import products from "src/__mocks__/products";
// import { ShoppingBagOutlined } from "@material-ui/icons";

export default function OrderDetail({
  order,
  onClick,
  onClickAccept,
  onClickReject
}) {
  const [isLoading, setIsLoading] = useState(false);

  const [buyerInfo, setBuyerInfo] = useState(null);
  useEffect(() => {
    console.log("The Single Order", order);
    fetchBuyerInfo();
  }, []);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const fetchBuyerInfo = async () => {
    const result = await shopAPI.getBuyerInfo(order.buyerId);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setBuyerInfo(result.data);
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title> Order Detail </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          // width:"50%",
          py: 3,
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          alignSelf: "center"
        }}
      >
        <Container>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignContent: "space-between",
              alignItems: "space-between"
            }}
          >
            <Button color="primary" variant="contained" onClick={onClick}>
              Back to Orders
            </Button>
            <div>
              <Button
                color="primary"
                variant="contained"
                onClick={onClickAccept}
                style={{ margin: 10 }}
              >
                Accept
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={onClickReject}
                style={{ margin: 10 }}
              >
                Reject
              </Button>
            </div>
          </Box>

          <Box
            style={{
              justifyContent: "space-between"
            }}
          >
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h3"
              style={{ marginTop: 10 }}
            >
              Order Id
            </Typography>
            <Typography
              align="center"
              color="textSecondary"
              gutterBottom
              variant="h3"
              style={{ marginTop: 10 }}
            >
              {order._id}
            </Typography>
          </Box>
          <Box>
            <Typography
              align="center"
              color="textPrimary"
              gutterBottom
              variant="h3"
              style={{ marginTop: 10 }}
            >
              Buyer Information
            </Typography>
            <div>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                <Avatar
                  alt="user"
                  src={buyerInfo?.image}
                  variant="rounded"
                  style={{
                    width: 80,
                    height: 80
                  }}
                />
              </Box>

              <Typography
                align="center"
                color="textSecondary"
                gutterBottom
                variant="h4"
                style={{ marginTop: 10 }}
              >
                {buyerInfo?.email}
              </Typography>
              <Typography
                align="center"
                color="textSecondary"
                gutterBottom
                variant="h4"
                style={{ marginTop: 10 }}
              >
                {order.deliveryDetails.phoneNumber}
              </Typography>
            </div>
          </Box>
          <Typography
            align="center"
            color="textSecondary"
            gutterBottom
            variant="h2"
            style={{ marginTop: 10 }}
          >
            Order Products
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: "white",
              margin: 10,
              padding: 10,
              borderRadius: 10
            }}
          >
            {order.products.map((product) => (
              <Box
                style={{
                  margin: 10,
                  backgroundColor: "#e8e8e8",
                  padding: 15,
                  borderRadius: 10
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    margin: 10
                  }}
                >
                  <img
                    src={product.productImage}
                    style={{
                      width: 200,
                      height: 200,
                      backgroundColor: "red"
                    }}
                  />
                </div>
                <Typography
                  align="center"
                  color="textSecondary"
                  gutterBottom
                  variant="h5"
                  style={{ marginTop: 10 }}
                >
                  Product Id
                </Typography>
                <Typography
                  align="center"
                  color="textPrimary"
                  gutterBottom
                  variant="h5"
                  style={{ marginTop: 10 }}
                >
                  {product._id}
                </Typography>
                <Typography
                  align="center"
                  color="textSecondary"
                  gutterBottom
                  variant="h5"
                  style={{ marginTop: 10 }}
                >
                  Product Name
                </Typography>
                <Typography
                  align="center"
                  color="textPrimary"
                  gutterBottom
                  variant="h5"
                  style={{ marginTop: 10 }}
                >
                  {product.productName}
                </Typography>

                <Typography
                  align="center"
                  color="textSecondary"
                  gutterBottom
                  variant="h5"
                  style={{ marginTop: 10 }}
                >
                  Product Price
                </Typography>
                <Typography
                  align="center"
                  color="textPrimary"
                  gutterBottom
                  variant="h5"
                  style={{ marginTop: 10 }}
                >
                  {product.productPrice}
                </Typography>
              </Box>
            ))}
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h3"
            style={{ marginTop: 10 }}
          >
            Address
          </Typography>
          <Typography
            align="center"
            color="textSecondary"
            gutterBottom
            variant="body1"
            style={{ marginTop: 10, fontSize: 20 }}
          >
            {`${order.deliveryDetails.address}, ${order.deliveryDetails.city.label},${order.deliveryDetails.province.label}`}
          </Typography>
          <Grid container spacing={5} sx={{ justifyContent: "space-between" }}>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex"
              }}
            >
              <CategoryIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="h4"
                style={{ marginTop: 20 }}
              >
                Order Status
              </Typography>
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body1"
                style={{ marginTop: 20 }}
              >
                {capitalizeFirstLetter(order.orderStatus)}
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: "center",
                display: "flex"
              }}
            >
              <LocalOfferIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="h4"
              >
                Total Order Cost
              </Typography>
              <Typography
                color="textPrimary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body1"
              >
                {order.totalOrderCost} RS
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
