import react, { useState, alert } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

import { useDispatch, useSelector } from "react-redux";
import Image from "../Image";
import uploadAsPromise from "../../api/upload";
import shopAPI from "../../api/shop";
import ProductCategories from "./ProductCategories";

const UpdateProduct = ({ onClose, product }) => {
  const state = useSelector((state) => state);
  const shop = state.entities.shop;
  const shopId = shop.data._id;
  const productId = product._id;
  // const shopEmail = shop.data.email;
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(product.productImage);
  const [value, setValue] = useState(product.productCategory);
  const [preview, setPreview] = useState(product.productImage);

  const handleSubmit = async ({
    productName,
    productDescription,
    productPrice
  }) => {
    if (!image) return console.log("Upload an Image");
    console.log(
      "In Submit Handler",
      productName,
      productDescription,
      productPrice,
      image,
      preview
    );
    const uploadType = "shop";
    var type = "image";
    let imageUri = "";
    await uploadAsPromise(image, type, uploadType, shopId).then((res) => {
      imageUri = res;
    });
    const data = {
      name: productName,
      description: productDescription,
      price: productPrice,
      image: imageUri,
      category: value
    };

    console.log("Data for Api", data);
    // // Api Call
    setIsLoading(true);

    const result = await shopAPI.updateProduct(
      productId,
      productName,
      productDescription,
      productPrice,
      imageUri,
      value.value
    );
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setIsLoading(false);
    onClose();
  };

  const imageHandler = async (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage(file);
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const removeHandler = () => {
    setImage("");
    setPreview("");
  };

  const onChangeCategory = (option) => {
    console.log(option.value);
    setValue(option);
  };

  return (
    <>
      <Helmet>
        <title>Update Product </title>
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
        <Container maxWidth={false}>
          <Formik
            initialValues={{
              productName: product.productName || "",
              productPrice: product.productPrice || "",
              productDescription: product.productDescription || ""
            }}
            validationSchema={Yup.object().shape({
              productName: Yup.string()
                .max(255)
                .required("Product Name is required"),
              productPrice: Yup.number().required("Product Price is required"),
              productDescription: Yup.string().required(
                "Product Description is required"
              )
            })}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Container maxWidth="lg">
                  <Box
                    sx={{
                      mb: 3,
                      display: "flex",
                      justifyContent: "space-between"
                    }}
                  >
                    <Box sx={{ py: 2 }}>
                      <Typography color="textPrimary" variant="h2">
                        Update Product
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Update Product Form
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        py: 2,
                        display: "flex",
                        justifyContent: "flex-end"
                      }}
                    >
                      <Button
                        startIcon={<CloudUploadIcon />}
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Update Product
                      </Button>
                    </Box>
                  </Box>

                  <TextField
                    error={Boolean(touched.productName && errors.productName)}
                    fullWidth
                    helperText={touched.productName && errors.productName}
                    label="Product Name"
                    margin="normal"
                    name="productName"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productName}
                    variant="outlined"
                  />
                  <TextField
                    error={Boolean(
                      touched.productDescription && errors.productDescription
                    )}
                    fullWidth
                    helperText={
                      touched.productDescription && errors.productDescription
                    }
                    label="Product Description "
                    margin="normal"
                    name="productDescription"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.productDescription}
                    variant="outlined"
                    multiline
                  />
                  <TextField
                    error={Boolean(touched.productPrice && errors.productPrice)}
                    fullWidth
                    helperText={touched.productPrice && errors.productPrice}
                    label="Product Price"
                    margin="normal"
                    name="productPrice"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="number"
                    value={values.productPrice}
                    variant="outlined"
                  />
                  <ProductCategories
                    value={value}
                    onChange={onChangeCategory}
                  />
                  <Image
                    imageHandler={imageHandler}
                    imageUri={image}
                    preview={preview}
                    onRemove={removeHandler}
                  />
                </Container>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default UpdateProduct;
