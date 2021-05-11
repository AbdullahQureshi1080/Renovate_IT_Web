import client from "./client";

const addProduct = (
  email,
  productName,
  productDescription,
  productPrice,
  productImage,
  productCategory
) =>
  client.post("shop/addProduct", {
    email,
    productName,
    productDescription,
    productPrice,
    productImage,
    productCategory
  });

const deleteProduct = (shopId, productId) =>
  client.post("shop/deleteProduct", {
    shopId,
    productId
  });

const getShopProducts = (shopId) =>
  client.post("shop/getShopProducts", {
    shopId
  });

const updateProfileImage = (shopId, image) =>
  client.post("shop/updateProfileImage", {
    shopId,
    image
  });

const getShopData = (shopId) =>
  client.post("shop/getShopData", {
    shopId
  });

const updateShopData = (shopId, data) =>
  client.post("shop/updateShopData", {
    shopId,
    data
  });

export default {
  addProduct,
  getShopProducts,
  deleteProduct,
  updateProfileImage,
  getShopData,
  updateShopData
};
