import { Helmet } from "react-helmet";
import { Box, Container, Grid } from "@material-ui/core";
import LatestOrders from "src/components/dashboard//LatestOrders";
import LatestProducts from "src/components/dashboard//LatestProducts";
import Budget from "src/components/dashboard//Budget";
import { useSelector } from "react-redux";
import TasksProgress from "src/components/dashboard/TasksProgress";
import TotalOrders from "src/components/dashboard/TotalOrders";
import TotalProfit from "src/components/dashboard/TotalProfit";
import Sales from "src/components/dashboard/Sales";
import TrafficByDevice from "src/components/dashboard/TrafficByDevice";
import { useState, useEffect } from "react";
import shopAPI from "../api/shop";

const Dashboard = () => {
  const state = useSelector((state) => state);
  const shop = state.entities.shop;
  const shopId = shop.data._id;
  const shopOrders = shop.orders ? shop.orders : [];
  const shopPrevOrders = shop.previousOrders ? shop.previousOrders : [];

  const [isLoading, setIsLoading] = useState(false);

  const [totalOrderCosts, setTotalOrderCosts] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [statusProgress, setStatusProgress] = useState([]);
  const [profit, setProfit] = useState(null);

  useEffect(() => {
    fetchShopOrders();
    fetchShopProducts();
  }, []);

  const fetchShopOrders = async () => {
    const result = await shopAPI.getShopOrders(shopId);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setOrders(result.data);
    const recievedOrders = result.data.filter((order) => {
      return order.orderStatus == "Confirmed";
    });
    const orderCostArray = recievedOrders.map(
      ({ totalOrderCost }) => totalOrderCost
    );
    const profitArray = orderCostArray.map((order) => {
      return order * 0.3;
    });
    var sumProfits = profitArray.reduce(function (a, b) {
      return a + b;
    }, 0);
    setProfit(sumProfits);
    var sum = orderCostArray.reduce(function (a, b) {
      return parseInt(a) + parseInt(b);
    }, 0);
    setTotalOrderCosts(sum);
    const statusArray = result.data.map(({ orderStatus }) => orderStatus);
    const confirmedOrders = statusArray.filter((status) => {
      return status.toLowerCase() == "confirmed";
    });
    setStatusProgress(confirmedOrders);
    setIsLoading(false);
  };

  const fetchShopProducts = async () => {
    const result = await shopAPI.getShopProducts(shopId);
    if (!result.ok) {
      setIsLoading(false);
      return;
    }
    console.log(result.data);
    setProducts(result.data);
    setIsLoading(false);
  };

  if (state === null) {
    return <div />;
  }
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={3}>
            <Grid item lg={6} sm={6} md={12} xl={9} xs={12}>
              <Budget orders={orders} cost={totalOrderCosts} />
            </Grid>
            <Grid item lg={6} sm={6} md={12} xl={9} xs={12}>
              <TotalOrders orders={orders} previousOrders={shopPrevOrders} />
            </Grid>
            <Grid item lg={6} sm={6} md={12} xl={9} xs={12}>
              <TasksProgress status={statusProgress} orders={orders} />
            </Grid>
            <Grid item lg={6} sm={6} md={12} xl={9} xs={12}>
              <TotalProfit sx={{ height: "100%" }} profit={profit} />
            </Grid>
            <Grid item lg={6} sm={6} md={12} xl={9} xs={12}>
              <LatestProducts sx={{ height: "100%" }} products={products} />
            </Grid>
            <Grid item lg={6} sm={6} md={12} xl={9} xs={12}>
              <LatestOrders orders={orders} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
