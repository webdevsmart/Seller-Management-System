import React, { Component } from "react";
import { 
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { Breadcrumb } from "egret";
import { getAllOrders } from "./OEMOrderService";
import moment from "moment";
import { Link } from "react-router-dom";
import { getOEMOrder } from "./OEMOrderService";
import { generateRandomId } from "utils";

class ViewOrder extends Component {
  state = {
    order_detail: null,
    warehosue: null,
    product_list: [],
    parts_list: [],
  };

  componentDidMount() {
    getOEMOrder(this.props.match.params.id).then((res) => {
      this.setState({order_detail: res.data.order_details, product_list: res.data.product_list, warehouse: res.data.warehouse});
    });
  }

  render() {
    let {order_detail, warehouse, product_list} = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Manage Reports" }]} />
        </div>
        <Grid container spacing={4} style={{ marginBottom: "250px" }}>
          <Grid item sm={12} xs={12}>
            <div className="w-100 overflow-auto">
              <h4 className="text-primary">Order Details</h4>
              <Table
                style={{
                  border: "1px solid rgba(224, 224, 224, 1)",
                  whiteSpace: "pre",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      className="bg-light-green">ID#</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green">Date Created</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green">Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    order_detail && (
                      <TableRow>
                        <TableCell align="center">{order_detail.ID}</TableCell>
                        <TableCell align="center">{moment(order_detail.created_date).format('LLLL')}</TableCell>
                        <TableCell align="center">{order_detail.submitted_user.name}</TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            <div className="w-100 overflow-auto">
              <h4 className="text-primary">Warehouse Details</h4>
              <Table
                style={{
                  border: "1px solid rgba(224, 224, 224, 1)",
                  whiteSpace: "pre",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >ID#</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Type</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Region</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Country</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    warehouse && (
                      <TableRow>
                        <TableCell align="center">{warehouse.ID}</TableCell>
                        <TableCell align="center">{warehouse.type.name}</TableCell>
                        <TableCell align="center">{warehouse.region}</TableCell>
                        <TableCell align="center">{warehouse.country}</TableCell>
                        <TableCell align="center">{warehouse.name}</TableCell>
                      </TableRow>
                    )
                  }
                </TableBody>
              </Table>
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            <div className="w-100 overflow-auto">
              <h4 className="text-primary">Product List</h4>
              <Table
                style={{
                  border: "1px solid rgba(224, 224, 224, 1)",
                  whiteSpace: "pre",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Quantity#</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >UPC</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >FNSKU</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Design</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    product_list && product_list.map((product, index) => {
                      return (
                          <TableRow key={index}>
                            <TableCell align="center">{product.quantity}</TableCell>
                            <TableCell align="center">{product.upc}</TableCell>
                            <TableCell align="center">{product.fnsku}</TableCell>
                            <TableCell align="center">{product.design}</TableCell>
                            <TableCell align="center">{product.name}</TableCell>
                          </TableRow>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </div>
          </Grid>
          <Grid item sm={12} xs={12}>
            <div className="w-100 overflow-auto">
              <h4 className="text-primary">Parts List</h4>
              <Table
                style={{
                  border: "1px solid rgba(224, 224, 224, 1)",
                  whiteSpace: "pre",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Quantity#</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Part ID#</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Part Name</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Type</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >UM</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Cost</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Supplier ID#</TableCell>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                    >Supplier Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    product_list && product_list.map((product, index) => {
                      return (
                        <>
                        {
                          product.parts_list.map((part, part_index) => {
                            return (
                              <TableRow key={generateRandomId()}>
                                <TableCell align="center">{parseInt(part.quantity)}</TableCell>
                                <TableCell align="center">{part.ID}</TableCell>
                                <TableCell align="center">{part.name}</TableCell>
                                <TableCell align="center">{part.type.name}</TableCell>
                                <TableCell align="center">{part.UM.name}</TableCell>
                                <TableCell align="center">$ {part.cost_usd}</TableCell>
                                <TableCell align="center">{part.supplier_id.ID}</TableCell>
                                <TableCell align="center">{part.supplier_id.name}</TableCell>
                              </TableRow>
                            )
                          })
                        }
                        </>
                      )
                    })
                  }
                </TableBody>
              </Table>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default ViewOrder;
