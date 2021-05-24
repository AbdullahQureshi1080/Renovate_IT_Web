import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/PeopleOutlined";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { green } from "@material-ui/core/colors";
import { red } from "@material-ui/core/colors";

const TotalOrders = ({ orders, previousOrders, ...props }) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TOTAL ORDERS
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {orders.length}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: green[600],
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      {orders.length > 0 ? (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            pt: 2
          }}
        >
          <ArrowUpwardIcon sx={{ color: green[900] }} />
          <Typography
            variant="body2"
            sx={{
              color: green[900],
              mr: 1
            }}
          >
            {Math.round(((previousOrders.length - 1) / orders.length) * 100)}%
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            pt: 2
          }}
        >
          <ArrowDownwardIcon sx={{ color: red[900] }} />
          <Typography
            variant="body2"
            sx={{
              color: green[900],
              mr: 1
            }}
          >
            {orders[1] % (orders.length - 1)}%
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

export default TotalOrders;
