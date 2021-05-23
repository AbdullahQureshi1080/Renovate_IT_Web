import { Helmet } from "react-helmet";
import { Box, Container, Grid, Pagination, Button } from "@material-ui/core";
import ProductListToolbar from "src/components/product/ProductListToolbar";
import ProductCard from "src/components/product//ProductCard";
import { useEffect, useState } from "react";
import shopAPI from "../api/shop";
import { useSelector } from "react-redux";
import ProductDetail from "src/components/product/ProductDetail";
import NewProduct from "src/components/product/NewProduct";
import UpdateProduct from "src/components/product/UpdateProduct";

const ProductList = () => {
  const [renderForm, setRenderForm] = useState(false);
  const [renderProductDetails, setRenderProductDetails] = useState(false);
  const [renderProductUpdate, setRenderProductUpdate] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);

  const state = useSelector((state) => state);
  const shop = state.entities.shop;
  const shopEmail = shop.data.email;
  const shopId = shop.data._id;
  // const navigate = useNavigate();
  const handleFormRender = () => {
    setRenderForm(false);
    getShopProducts();
  };

  const handleUpdateRender = () => {
    setRenderProductUpdate(false);
    setRenderProductDetails(false);
  };

  useEffect(() => {
    getShopProducts();
  }, []);

  const getShopProducts = async () => {
    const result = await shopAPI.getShopProducts(shopId);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setProducts(result.data);
    setIsLoading(false);
  };

  const productHandler = (product) => {
    setProduct(product);
    setRenderProductDetails(true);
  };

  const updateHandler = (product) => {
    console.log("Update Handler");
    // setRenderProductDetails(false);
    setRenderProductUpdate(true);
  };

  const deleteHandler = async (product) => {
    console.log("Delete Handler");
    const result = await shopAPI.deleteProduct(shopId, product._id);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    // setProducts(result.data)
    setIsLoading(false);
    setRenderProductDetails(false);
    getShopProducts();
  };

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3
        }}
      >
        {!renderProductDetails ? (
          !renderForm ? (
            <Container maxWidth={false}>
              <ProductListToolbar onClickAdd={() => setRenderForm(true)} />
              <Box sx={{ pt: 3 }}>
                <Grid container spacing={4}>
                  {products.map((product) => (
                    <Grid item key={product._id} lg={6} md={8} xs={12}>
                      <ProductCard
                        product={product}
                        onClick={() => productHandler(product)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  pt: 3
                }}
              ></Box>
            </Container>
          ) : (
            <Box sx={{ pt: 3 }}>
              <Container maxWidth={false}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: 3
                    //  width:"50%"
                  }}
                >
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => setRenderForm(false)}
                  >
                    Cancel
                  </Button>
                </Box>
                <NewProduct onClose={handleFormRender} />
              </Container>
            </Box>
          )
        ) : !renderProductUpdate ? (
          <ProductDetail
            product={product}
            onClick={() => setRenderProductDetails(false)}
            onClickUpdate={() => updateHandler(product)}
            onClickDelete={() => deleteHandler(product)}
          />
        ) : (
          <Box sx={{ pt: 3 }}>
            <Container maxWidth={false}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: 3
                  //  width:"50%"
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setRenderProductUpdate(false)}
                >
                  Cancel
                </Button>
              </Box>
              <UpdateProduct product={product} onClose={handleUpdateRender} />
            </Container>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProductList;
