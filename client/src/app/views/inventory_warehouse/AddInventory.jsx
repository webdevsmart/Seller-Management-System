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
import NumberFormat from "react-number-format";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import {
  getAllLocations,
} from "../inventory_warehouse_location/LocationService";
import {
  getInventoryReport,
  addNewInventoryReport,
} from "./InventoryWarehouseService";
import moment from "moment";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
    />
  );
}

class LocationList extends Component {
  state = {
    warehouseOptions: [],
    selectedWarehouse: null,
    selectedLocation: null,
    date: null,
    reportList: [],

    showLoading: false,
    submitLoading: false,
    messageType: "warning",
    messageOpen: false,
    messageContent: "",
    rowsPerPage: 10,
    page: 0,
    submittedInfo: null,
  };

  componentDidMount() {
    getAllLocations().then((res) => {
      const data = res.data;
      let tmpList = [];
      data.map((item) => {
        tmpList.push({ ...item, value: item._id, label: item.ID + " - " + item.short_name + " - " + item.country });
      });
      this.setState({ warehouseOptions: tmpList });
    });
  }

  handleSelectWarehouse = (data) => {
    this.setState({ selectedWarehouse: data });
  };

  closeMessage = () => {
    this.setState({ messageOpen: false });
  };

  validateSelection = () => {
    if (this.state.selectedWarehouse == null) {
      this.setState({
        messageOpen: true,
        messageType: "warning",
        messageContent: "Please select warehouse name!",
      });
      return false;
    }

    if (this.state.date == null) {
      this.setState({
        messageOpen: true,
        messageType: "warning",
        messageContent: "Please select date!",
      });
      return false;
    }
    return true;
  };

  showData = () => {
    if (this.validateSelection() == false) return;
    this.setState({ showLoading: true });
    let searchCondition = {
      date: this.state.date,
      warehouse: this.state.selectedWarehouse.value,
    };
    getInventoryReport(searchCondition)
      .then((res) => {
        this.setState({ showLoading: false });
        let tmpList = [];
        if (res.data.is_exist == false) {
          this.setState({ submittedInfo: null });
          res.data.results.map((item) => {
            tmpList.push({
              product_id: item._id,
              sku: item.sku,
              upc: item.upc,
              asin: item.asin,
              name: item.name,
              warehouse: 0,
              warehouse_inbound: 0,
            });
          });
        } else {
          this.setState({
            submittedInfo: {
              userName: res.data.submitted_user,
              modifiedAt: res.data.modified_at,
            },
          });
          res.data.results.map((item) => {
            tmpList.push({
              product_id: item.product_id,
              sku: item.sku,
              upc: item.upc,
              asin: item.asin,
              name: item.name,
              warehouse: item.warehouse,
              warehouse_inbound: item.warehouse_inbound,
            });
          });
        }
        this.setState({ reportList: tmpList });
      })
      .catch((err) => {
        this.setState({
          showLoading: false,
          messageOpen: true,
          messageType: "warning",
          messageContent: err.response.data.message,
        });
      });
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

  handleInputChange = (event, name, index) => {
    let { reportList } = this.state;
    reportList[index][name] = event.target.value;
    this.setState({ reportList });
  };

  handleSubmit = () => {
    let { reportList } = this.state;
    this.setState({ submitLoading: true });
    let newItem = [];
    reportList.map((item) => {
      newItem.push({
        product: item.product_id,
        warehouse: item.warehouse,
        warehouse_inbound: item.warehouse_inbound,
        total: parseFloat(item.warehouse) + parseFloat(item.warehouse_inbound),
      });
    });
    let postData = {
      items: newItem,
      warehouse: this.state.selectedWarehouse.value,
      date: this.state.date,
      submitted_user: JSON.parse(localStorage.getItem("auth_user"))._id,
    };
    addNewInventoryReport(postData).then((res) => {
      this.setState({ submittedInfo: {
        userName: JSON.parse(localStorage.getItem("auth_user")).name,
        modifiedAt: res.data.modified_at
      }, submitLoading: false, messageOpen: true, messageType: "success", messageContent: "Submitted successfully!" });
    });
  };

  render() {
    let {
      reportList,
      warehouseOptions,
      selectedWarehouse,
      locationList,
      selectedLocation,
      date,
      showLoading,
      submitLoading,
      messageType,
      messageOpen,
      messageContent,
      rowsPerPage,
      page,
      submittedInfo,
    } = this.state;

    return (
      <div className="m-sm-30">
        <SimpleCard title="Inventory Warehouse Report">
          {submittedInfo && (
            <Card
              elevation={6}
              className="welcome-card bg-light-primary p-sm-24 mb-24  flex flex-space-between"
            >
              <div className="pr-16">
                <p className="m-0 text-black">
                  Last Submitted{" "}
                  <span className="text-error">{moment(submittedInfo.modifiedAt).format("LLLL")}</span>{" "}
                  by{" "}
                  <span className="font-weight-500 text-primary">
                    {submittedInfo.userName}
                  </span>
                </p>
              </div>
            </Card>
          )}
          <Grid container spacing={4} style={{ marginBottom: "250px" }}>
            <Grid item sm={12} xs={12}>
              <CustomSelect
                textFieldProps={{
                  label: "Select Warehouse by Name",
                  InputLabelProps: {
                    htmlFor: "react-select-single",
                    shrink: true,
                  },
                  placeholder: "",
                }}
                options={warehouseOptions}
                handleChange={(data) => this.handleSelectWarehouse(data)}
                selectedValue={selectedWarehouse}
              />
            </Grid>
            <Grid item sm={6} xs={12}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  className="mb-16 w-100"
                  margin="none"
                  id="mui-pickers-date"
                  label="Select Date"
                  inputVariant="standard"
                  type="text"
                  autoOk={true}
                  value={date}
                  format={"MMM, dd yyyy"}
                  onChange={(date) => this.setState({ date: date })}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item sm={6} xs={12}>
              <Button
                type="submit"
                onClick={this.showData}
                disabled={showLoading}
                className="mb-16 mr-32"
                variant="contained"
                color="secondary"
              >
                Show Data
                {showLoading && (
                  <CircularProgress className="ml-10" size={24} />
                )}
              </Button>
              <Button
                className="mb-16"
                variant="contained"
                color="primary"
                disabled={submitLoading}
                onClick={this.handleSubmit}
              >
                {submitLoading && (
                  <CircularProgress className="ml-10" size={24} />
                )}
                Submit
              </Button>
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
                        colSpan={3}
                        className="bg-primary"
                      ></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">SKU</TableCell>
                      <TableCell align="center">UPC</TableCell>
                      <TableCell align="center">ASIN</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Warehouse</TableCell>
                      <TableCell align="center">Warehouse Inbound</TableCell>
                      <TableCell align="center">Total In Location</TableCell>
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
                              <TableCell className="px-10" align="center">
                                <TextField
                                  onChange={(e) =>
                                    this.handleInputChange(
                                      e,
                                      "warehouse",
                                      index
                                    )
                                  }
                                  InputProps={{
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  value={item.warehouse}
                                />
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                <TextField
                                  name="warehouse_inbound"
                                  onChange={(e) =>
                                    this.handleInputChange(
                                      e,
                                      "warehouse_inbound",
                                      index
                                    )
                                  }
                                  InputProps={{
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  value={item.warehouse_inbound}
                                />
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                <TextField
                                  InputProps={{
                                    inputComponent: NumberFormatCustom,
                                  }}
                                  readOnly
                                  value={
                                    parseFloat(item.warehouse) +
                                    parseFloat(item.warehouse_inbound)
                                  }
                                />
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

export default LocationList;
