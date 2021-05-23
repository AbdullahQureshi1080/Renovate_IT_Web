import { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@material-ui/core";
import getInitials from "src/utils/getInitials";

const OrderListResults = ({ orders, onClick, ...rest }) => {
  const [selectedOrderIds, setSelectedOrderIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedOrderIds;

    if (event.target.checked) {
      newSelectedOrderIds = orders.map((order) => order._id);
    } else {
      newSelectedOrderIds = [];
    }

    setSelectedOrderIds(newSelectedOrderIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedOrderIds.indexOf(id);
    let newSelectedOrderIds = [];

    if (selectedIndex === -1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds, id);
    } else if (selectedIndex === 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(1)
      );
    } else if (selectedIndex === selectedOrderIds.length - 1) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedOrderIds = newSelectedOrderIds.concat(
        selectedOrderIds.slice(0, selectedIndex),
        selectedOrderIds.slice(selectedIndex + 1)
      );
    }

    setSelectedOrderIds(newSelectedOrderIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  {/* <Checkbox
                    checked={selectedOrderIds.length === orders.length}
                    color="primary"
                    indeterminate={
                      selectedOrderIds.length > 0 &&
                      selectedOrderIds.length < orders.length
                    }
                    onChange={handleSelectAll}
                  /> */}
                </TableCell>
                <TableCell>Order Id</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Order date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.slice(0, limit).map((order) => (
                <TableRow
                  hover
                  key={order._id}
                  selected={selectedOrderIds.indexOf(order._id) !== -1}
                  onClick={() => onClick(order)}
                >
                  <TableCell padding="checkbox">
                    {/* <Checkbox
                      checked={selectedOrderIds.indexOf(order._id) !== -1}
                      onChange={(event) => handleSelectOne(event, order._id)}
                      value="true"
                    /> */}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex"
                        // backgroundColor: "red"
                      }}
                    >
                      {/* <Avatar src={order.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(order.name)}
                      </Avatar> */}
                      <Typography color="textPrimary" variant="body1">
                        {order._id}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{order.orderStatus}</TableCell>
                  <TableCell>
                    {`${order.deliveryDetails.address}, ${order.deliveryDetails.city.label},${order.deliveryDetails.province.label}`}
                  </TableCell>
                  <TableCell>{order.deliveryDetails.phoneNumber}</TableCell>
                  <TableCell>
                    {moment(order.date).format("DD/MM/YYYY")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={orders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

OrderListResults.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrderListResults;
