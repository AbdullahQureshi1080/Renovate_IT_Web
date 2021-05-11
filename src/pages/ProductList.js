import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination,
  Button
} from '@material-ui/core';
import ProductListToolbar from 'src/components/product/ProductListToolbar';
import ProductCard from 'src/components/product//ProductCard';
// import products from 'src/__mocks__/products';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NewProduct from 'src/components/product/NewProduct';
import shopAPI from  "../api/shop";
import { useSelector } from 'react-redux';
import ProductDetail from 'src/components/product/ProductDetail';


const ProductList = () =>{
  const [renderForm,setRenderForm] = useState(false);
  const [renderProductDetails,setRenderProductDetails] = useState(false);

  const [isLoading, setIsLoading] = useState(false); 
  
  const [products, setProducts] = useState([]); 
  const [product,setProduct] = useState(null);
  
  const state = useSelector((state) => state);
  const shop = state.entities.shop;
  const shopEmail = shop.data.email;
  // const navigate = useNavigate();
  const handleFormRender = ()=>{
    setRenderForm(false);
  }

  useEffect(()=>{
    getAllUserProducts();
  },[])

  const getAllUserProducts = async ()=>{
    const result = await  shopAPI.getAllUserProducts(shopEmail);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data)
    setProducts(result.data)
    setIsLoading(false);
  }

  const productHandler = (product)=>{
    setProduct(product);
    setRenderProductDetails(true);
  }


  const updateHandler = (product)=>{
    console.log("Update Handler")
   }

  const deleteHandler = async(product)=>{
    console.log("Delete Handler")
    const result = await shopAPI.deleteProduct(shopEmail,product._id);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data)
    // setProducts(result.data)
    setIsLoading(false);
    setRenderProductDetails(false);
    getAllUserProducts();
   }

  return (
  <>
    <Helmet>
      <title>Products</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      {
        !renderProductDetails?
        (
            !renderForm?(
              <Container maxWidth={false}>
              <ProductListToolbar onClickAdd={()=>setRenderForm(true)}/>
              <Box sx={{ pt: 3 }}>
                <Grid
                  container
                  spacing={3}
                >
                  {products.map((product) => (
                    <Grid
                      item
                      key={product.id}
                      lg={4}
                      md={6}
                      xs={12}
                    >
                      <ProductCard product={product} onClick={()=>productHandler(product)}/>
                    </Grid>
                  ))}
                </Grid>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  pt: 3
                }}
              >
              </Box>
            </Container>
            )
            :
            (
              <Box sx={{ pt: 3 }}>
              <Container maxWidth={false}>
              <Box
               sx={{
                 display: 'flex',
                 justifyContent: 'flex-end',
                 paddingRight:3,
                //  width:"50%"
                }}
                >
              <Button
                color="primary"
                variant="contained"
                onClick={()=>setRenderForm(false)}
                >
                Cancel
              </Button>
              </Box>
              <NewProduct onClose={handleFormRender}/>
              </Container>
              </Box>
            )    
        )
        :
        (
          <ProductDetail 
          product={product} 
          onClick={()=>setRenderProductDetails((false))}
          onClickUpdate={()=>updateHandler(product)}
          onClickDelete={()=>deleteHandler(product)}
          />
        )
      }
      {/* {
        !renderForm?(
          <Container maxWidth={false}>
          <ProductListToolbar onClickAdd={()=>setRenderForm(true)}/>
          <Box sx={{ pt: 3 }}>
            <Grid
              container
              spacing={3}
            >
              {products.map((product) => (
                <Grid
                  item
                  key={product.id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              pt: 3
            }}
          >
          </Box>
        </Container>
        )
        :
        (
          <Box sx={{ pt: 3 }}>
          <Container maxWidth={false}>
          <Box
           sx={{
             display: 'flex',
             justifyContent: 'flex-end',
             paddingRight:3,
            //  width:"50%"
            }}
            >
          <Button
            color="primary"
            variant="contained"
            onClick={()=>setRenderForm(false)}
            >
            Cancel
          </Button>
          </Box>
          <NewProduct onClose={handleFormRender}/>
          </Container>
          </Box>
        )
      } */}
  
    </Box>
  </>
  )
}

export default ProductList;
