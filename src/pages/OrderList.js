import { Helmet } from "react-helmet";
import { Box, Container } from "@material-ui/core";
import customers from "src/__mocks__/customers";
import OrderListToolbar from "src/components/order/OrderListToolbar";
import OrderListResults from "src/components/order/OrderListResults";
import { useEffect, useState } from "react";
import shopAPI from "../api/shop";
import { useSelector } from "react-redux";
import OrderDetail from "src/components/order/OrderDetail";
const OrderList = () => {
  const state = useSelector((state) => state);
  const shop = state.entities.shop;
  const shopId = shop.data._id;

  const [renderOrderDetails, setRenderOrderDetails] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchShopOrders();
  }, []);

  const fetchShopOrders = async () => {
    const result = await shopAPI.getShopOrders(shopId);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setOrders(result.data);
    setIsLoading(false);
  };

  const orderHandler = (order) => {
    setOrder(order);
    setRenderOrderDetails(true);
  };

  const acceptHandler = async (order) => {
    console.log("Accept Handler");
    const orderId = order._id;
    const result = await shopAPI.acceptOrder(orderId);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    // setProducts(result.data)
    setIsLoading(false);
    // setRenderOrderDetails(false);
    fetchShopOrders();
  };

  const rejectHandler = async (order) => {
    console.log("Reject Handler");
    const orderId = order._id;
    const result = await shopAPI.rejectOrder(orderId);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    // setProducts(result.data)
    setIsLoading(false);
    // setRenderOrderDetails(false);
    fetchShopOrders();
  };

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3
        }}
      >
        {!renderOrderDetails ? (
          <Container maxWidth={false}>
            <OrderListToolbar />
            <Box sx={{ pt: 3 }}>
              <OrderListResults
                orders={orders}
                onClick={(order) => orderHandler(order)}
              />
            </Box>
          </Container>
        ) : (
          <OrderDetail
            order={order}
            onClick={() => setRenderOrderDetails(false)}
            onClickAccept={() => acceptHandler(order)}
            onClickReject={() => rejectHandler(order)}
          />
        )}
      </Box>
    </>
  );
};

export default OrderList;
