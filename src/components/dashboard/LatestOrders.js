import moment from "moment";
import { v4 as uuid } from "uuid";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

const LatestOrders = ({ orders, ...props }) => (
  <Card {...props}>
    <CardHeader title="Latest Orders" />
    <Divider />
    <PerfectScrollbar>
      <Box sx={{ minWidth: 500 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell>Order Status</TableCell>
              <TableCell sortDirection="desc">
                <Tooltip enterDelay={300} title="Sort">
                  <TableSortLabel active direction="desc">
                    Date
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders
              .map((order) => (
                <TableRow hover key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>
                    {moment(order.date).format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              ))
              .slice(0, 5)}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
  </Card>
);

export default LatestOrders;
