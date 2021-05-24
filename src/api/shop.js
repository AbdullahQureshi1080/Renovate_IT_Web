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

const updateProduct = (
  productId,
  productName,
  productDescription,
  productPrice,
  productImage,
  productCategory
) =>
  client.post("shop/updateProduct", {
    productId,
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

const getShopOrders = (shopId) =>
  client.post("shop/getShopOrders", {
    shopId
  });

const updateProfileImage = (shopId, image) =>
  client.post("shop/updateProfileImage", {
    shopId,
    image
  });

const getBuyerInfo = (buyerId) =>
  client.post("shop/getBuyerInfo", {
    buyerId
  });

const getShopData = (shopId) =>
  client.post("shop/getShopData", {
    shopId
  });

const updateShopPassword = (shopId, password) =>
  client.post("shop/updatePassword", {
    shopId,
    password
  });
const updateShopData = (shopId, data) =>
  client.post("shop/updateShopData", {
    shopId,
    data
  });
const acceptOrder = (orderId) =>
  client.post("shop/acceptOrder", {
    orderId
  });
const rejectOrder = (orderId) =>
  client.post("shop/rejectOrder", {
    orderId
  });

export default {
  updateShopPassword,
  addProduct,
  updateProduct,
  getShopProducts,
  deleteProduct,
  updateProfileImage,
  getShopData,
  getBuyerInfo,
  getShopOrders,
  updateShopData,
  acceptOrder,
  rejectOrder
};
