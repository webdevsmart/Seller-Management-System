import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  Snackbar,
  CircularProgress,
  TablePagination,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { SimpleCard } from "egret";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import {
  getAllSalesOutlets
} from "../sales_outlet/SalesOutletService"
import {
    getSalesReportSummary
} from "./SalesReportSummaryService";
import moment from "moment";

class SalesReportSummary extends Component {
  state = {
    salesOutletList: [],
    monthYear: new Date(),
    reportList: [],

    messageType: "warning",
    messageOpen: false,
    messageContent: "",
    rowsPerPage: 10,
    page: 0,
  };

  componentDidMount() {
    getAllSalesOutlets().then((res) => {
      let salesOutletList = res.data.map((item) => { return item.short_name });
      this.setState({salesOutletList});
    });
    getSalesReportSummary({date: new Date()}).then((res) => {
      let reportList = res.data.results.map((item) => {
        return {
          ...item
        }
      });
      this.setState({reportList});
    });
  }

  closeMessage = () => {
    this.setState({ messageOpen: false });
  };

  setPage = (page) => {
    this.setState({ page });
  };

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleChangedate = (date) => {
    this.setState({monthYear: date, reportList: []});
    getSalesReportSummary({date: date}).then((res) => {
      let reportList = res.data.results.map((item) => {
        return {
          ...item
        }
      });
      this.setState({reportList});
    });
  }
  
  render() {
    let {
      salesOutletList,
      reportList,
      monthYear,
      messageType,
      messageOpen,
      messageContent,
      rowsPerPage,
      page,
    } = this.state;

    return (
      <div className="m-sm-30">
        <SimpleCard title="Sales Report Summary">
          <Grid container spacing={4}>
            <Grid item sm={6} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="mb-16 w-100"
                  views={["year", "month"]}
                  margin="none"
                  id="mui-pickers-date"
                  label="Select Year/Month"
                  inputVariant="standard"
                  type="text"
                  autoOk={true}
                  value={monthYear}
                  format={"yyyy-MMM"}
                  onChange={(date) => this.handleChangedate(date)}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item sm={12} xs={12}>
              <div className="w-100 overflow-auto">
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
                        colSpan={4}
                        className="bg-light-green"
                      >
                        Product
                      </TableCell>
                      <TableCell
                        align="center"
                        colSpan={salesOutletList.length + 1}
                        className="bg-primary"
                      ></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">SKU</TableCell>
                      <TableCell align="center">UPC</TableCell>
                      <TableCell align="center">ASIN</TableCell>
                      <TableCell align="center">Name</TableCell>
                      {
                        salesOutletList.map((item, index) => {
                          return (
                            <TableCell key={index} align="center">
                              {item}
                            </TableCell>
                          )
                        })
                      }
                      <TableCell align="center">
                        Total
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {reportList &&
                      reportList
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((item, index) => {
                          let total = 0;
                          return (
                            <TableRow key={index}>
                              <TableCell className="px-10" align="center">
                                {item.sku}
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                {item.upc}
                              </TableCell>
                              <TableCell align="center" className="px-10">
                                {item.asin}
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                {item.name}
                              </TableCell>
                              {
                                salesOutletList.map((outlet, outletIndex) => {
                                  total += item[outlet] ? item[outlet] : 0;
                                  return (
                                    <TableCell className="px-10" align="center" key={outletIndex}>
                                      {item[outlet] ? item[outlet] : 'NA'}
                                    </TableCell>
                                  )
                                })
                              }
                              <TableCell className="px-10" align="center">
                                {total}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                </Table>
                <TablePagination
                  className="px-16"
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={reportList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  backIconButtonProps={{
                    "aria-label": "Previous Page",
                  }}
                  nextIconButtonProps={{
                    "aria-label": "Next Page",
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.setRowsPerPage}
                />
              </div>
            </Grid>
          </Grid>
        </SimpleCard>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={messageOpen}
          autoHideDuration={2000}
          onClose={this.closeMessage}
        >
          <MySnackbarContentWrapper
            onClose={this.closeMessage}
            variant={messageType}
            message={messageContent}
          />
        </Snackbar>
      </div>
    );
  }
}

export default SalesReportSummary;
