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
import products from 'src/__mocks__/products';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NewProduct from 'src/components/product/NewProduct';

const ProductList = () =>{
  const [renderForm,setRenderForm] = useState(false);
  // const navigate = useNavigate();
  const handleFormRender = ()=>{
    setRenderForm(false);
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
      }
  
    </Box>
  </>
  )
}

export default ProductList;
