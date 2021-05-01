import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import {useDispatch,useSelector} from 'react-redux';
import storeAPI from  "../api/auth";
import { setShopData, loginShop } from "../store/shop";
// import useApi from 'src/hooks/useApi.js';
import { useState } from 'react';

const Register = () => {
  const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const store = state.entities.shop;
  const navigate = useNavigate();
  // const loginApi = useApi(storeAPI.login);
  const [loginFailed, setLoginFailed] = useState(false); 
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit=async ({shopName,phoneNumber,email,password})=>{
    
    console.log("In Register",shopName,phoneNumber,email,password);
    // Api Call
    setIsLoading(true);
    const result = await storeAPI.register(shopName,phoneNumber,email,password);
    if (!result.ok) {
      setIsLoading(false);
      setLoginFailed(true);
      return;
    }
    console.log(result.data)
    setLoginFailed(false);
    dispatch(loginShop(result.data));
    setIsLoading(false);
    navigate('/login', { replace: true, });
  }

  return (
    <>
      <Helmet>
        <title>Register Your Shop </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              shopName: '',
              password: '',
              phoneNumber:'',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                shopName: Yup.string().max(255).required('First name is required'),
                password: Yup.string().max(255).required('password is required'),
                phoneNumber: Yup.string().matches(phoneRegExp, ('Phone number is not valid, Number start with +92 or 03XX')),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={(values)=>{
            handleSubmit(values);
            }}
            // handleSubmit=
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
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.shopName && errors.shopName)}
                  fullWidth
                  helperText={touched.shopName && errors.shopName}
                  label="Shop Name"
                  margin="normal"
                  name="shopName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.shopName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  fullWidth
                  helperText={touched.phoneNumber && errors.phoneNumber}
                  label="Phone Number"
                  margin="normal"
                  name="phoneNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phoneNumber}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    style={styles.submitButton}
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

const styles  = {
  submitButton:{
    backgroundColor:"#e8e8e8",
    color:"red",
  }
}

export default Register;
