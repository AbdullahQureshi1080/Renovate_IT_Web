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


export default {
 addProduct
}