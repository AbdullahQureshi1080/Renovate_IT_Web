import react, { useState, alert } from "react";
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

export default function ProductDetail({
  product,
  onClick,
  onClickDelete,
  onClickUpdate
}) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  //   console.log(capitalizeFirstLetter('foo'));
  return (
    <>
      <Helmet>
        <title> Product Detail </title>
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
              // backgroundColor:"red",
            }}
          >
            <Button color="primary" variant="contained" onClick={onClick}>
              Back to Products
            </Button>
            <Button color="primary" variant="contained" onClick={onClickUpdate}>
              Update
            </Button>
            <Button color="primary" variant="contained" onClick={onClickDelete}>
              Delete
            </Button>
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="h1"
            style={{ marginTop: 10 }}
          >
            {product.productName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              pt: 2,
              height: 600
            }}
          >
            <Avatar
              alt="Product"
              src={product.productImage}
              variant="square"
              style={{
                width: 400,
                height: "80%"
              }}
            />
          </Box>
          <Typography
            align="center"
            color="textPrimary"
            gutterBottom
            variant="body1"
            style={{ marginTop: 10, fontSize: 20 }}
          >
            {product.productDescription}
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
                Product Category
              </Typography>
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body1"
                style={{ marginTop: 20 }}
              >
                {capitalizeFirstLetter(product.productCategory)}
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
                Product Price
              </Typography>
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body1"
              >
                {product.productPrice} RS
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
