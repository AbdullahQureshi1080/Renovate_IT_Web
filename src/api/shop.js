import client from './client';

const  addProduct = (email,productName,productDescription,productPrice,productImage,productCategory) =>
  client.post('shop/addProduct', {
    email,
    productName,
    productDescription,
    productPrice,
    productImage,
    productCategory,
  });

  const  deleteProduct = (email,productId) =>
  client.post('shop/deleteProduct', {
    email,
    productId
  });


  const  getAllUserProducts = (email) =>
  client.post('shop/getAllUserProducts', {
    email,
  });



export default {
 addProduct,
 getAllUserProducts,
 deleteProduct,
}