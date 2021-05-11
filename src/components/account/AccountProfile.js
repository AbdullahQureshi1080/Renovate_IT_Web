import moment from "moment";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Image from "../Image";
import uploadAsPromise from "../../api/upload";
import shopAPI from "../../api/shop";

const AccountProfile = (props) => {
  const state = useSelector((state) => state);
  const shop = state.entities.shop.data;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const shopId = shop._id;
  const email = shop.email;
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");

  const getShopData = async () => {
    const result = await shopAPI.getShopData(shopId);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setData(result.data);
    setImage(
      result.data.image === null
        ? "https://via.placeholder.com/150"
        : result.data.image
    );
    setIsLoading(false);
  };

  useEffect(() => {
    getShopData();
    console.log("Shop data ", data);
  }, []);

  if (data == null) {
    return <div></div>;
  }

  const imageHandler = async (e) => {
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage(file);
      setPreview(reader.result);
    };

    reader.readAsDataURL(file);
  };
  const removeHandler = () => {
    setImage("");
    setPreview("");
  };

  const uploadHandler = async () => {
    if (!preview) return console.log("Upload an Image");
    console.log("In Upload Handler", image, preview, email);
    const uploadType = "shop";
    var type = "image";
    let imageUri = "";
    await uploadAsPromise(image, type, uploadType, shopId).then((res) => {
      imageUri = res;
    });
    const data = {
      shopId: shopId,
      image: imageUri
    };
    setImage(imageUri);
    console.log("Data for Profile Api", data);
    setIsLoading(true);
    const result = await shopAPI.updateProfileImage(shopId, imageUri);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setIsLoading(false);
  };

  return (
    <Card {...props}>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <Avatar
            src={image}
            sx={{
              height: 100,
              width: 100
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h3">
            {data.shopName}
          </Typography>
          <Typography color="textSecondary" gutterBottom variant="h4">
            {data.email}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          onClick={uploadHandler}
        >
          Upload picture
        </Button>
      </CardActions>
      <Image
        imageHandler={imageHandler}
        imageUri={image}
        preview={preview}
        onRemove={removeHandler}
      />
    </Card>
  );
};

export default AccountProfile;
