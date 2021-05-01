import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith',
  timezone: 'GTM-7'
};

const AccountProfile = (props) => {
  const state = useSelector(state=>state);
  const shop = state.entities.shop.data; 
  const [image,setImage] = useState("")
  useEffect(() => {  
      setImage(shop.image === null?"https://via.placeholder.com/150":shop.image)
  }, []);
  return(
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
           src={image}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {shop.shopName}
        </Typography>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="h4"
        >
          {shop.email}
        </Typography>
        {/* <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${moment().format('hh:mm A')} ${shop.date}`}
        </Typography> */}
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
  )
};

export default AccountProfile;
