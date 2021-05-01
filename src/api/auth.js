import client from './client';

const login = (email,password) => client.post('shop/login', {
    email,password
});

const register = (shopName, phoneNumber, email, password) =>
  client.post('shop/register', {
    shopName,
    phoneNumber,
    email,
    password,
  });


export default {
    login,
    register,
}