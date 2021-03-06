import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from "@material-ui/core";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import MoneyIcon from "@material-ui/icons/Money";
import { red } from "@material-ui/core/colors";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { green } from "@material-ui/core/colors";

const Budget = ({ orders, cost, ...props }) => (
  <Card sx={{ height: "100%" }} {...props}>
    <CardContent>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            ORDERS AMOUNT
          </Typography>
          <Typography color="textPrimary" variant="h3">
            {cost} RS
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: red[600],
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
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
            {Math.round((orders[orders.length - 1] / cost) * 100)}%
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

export default Budget;
