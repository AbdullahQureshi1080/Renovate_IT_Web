import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import CategoryIcon from "@material-ui/icons/Category";

const ProductCard = ({ product, onClick, ...rest }) => {
  return (
    <Card
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        borderRadius: 10
        // width:"70%",
      }}
      {...rest}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            // pb: 3,
            // style
            // size=100,
            height: 300,
            borderRadius: 10
            // backgroundColor:"red"
          }}
        >
          <Avatar
            alt="Product"
            src={product.productImage}
            variant="square"
            style={{
              width: "80%",
              height: "80%",
              borderRadius: 10
            }}
          />
        </Box>

        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
          style={{ marginTop: 10 }}
        >
          {product.productName}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
          style={{ marginTop: 10 }}
        >
          {product.productDescription}
        </Typography>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
      <Divider />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex"
            }}
          >
            <CategoryIcon color="action" />
            <Typography
              color="textSecondary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body2"
            >
              {product.productCategory}
            </Typography>
          </Grid>
          <Grid
            item
            sx={{
              alignItems: "center",
              display: "flex"
            }}
          >
            <LocalOfferIcon color="action" />
            <Typography
              color="textPrimary"
              display="inline"
              sx={{ pl: 1 }}
              variant="body1"
            >
              {product.productPrice} RS
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired
};

export default ProductCard;
