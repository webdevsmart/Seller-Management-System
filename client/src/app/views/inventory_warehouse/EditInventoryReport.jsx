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
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { SimpleCard } from "egret";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import NumberFormat from "react-number-format";
import MUIDataTable from "mui-datatables";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { getAllLocations } from "../inventory_warehouse_location/LocationService";
import { updateInventoryReportById, getInventoryReportById } from "./InventoryWarehouseService";
import { getAllProducts } from "../product/ProductService";
import { generateRandomId } from "utils";
import moment from "moment";

const options = {
  filterType: "checkbox",
  customToolbarSelect: () => {},
  selectableRows: "none",
};

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
    datetime: null,
    reportList: [],

    submitLoading: false,
    messageType: "warning",
    messageOpen: false,
    messageContent: "",
    submittedInfo: null,
  };

  componentDidMount() {
    this.getInitialState();
    getAllLocations().then((res) => {
      const data = res.data;
      let tmpList = [];
      data.map((item) => {
        tmpList.push({
          ...item,
          value: item._id,
          label:
            item.ID +
            " - " +
            item.short_name +
            " - " +
            item.country +
            " - " +
            item.type.name,
        });
      });
      this.setState({ warehouseOptions: tmpList });
    });
  }

  getInitialState = () => {
    getInventoryReportById(this.props.match.params.id).then((res) => {
      let submittedInfo = {
        userName: res.data.report.editted_user.name,
        modifiedAt: res.data.report.modified_at,
      }
      let reportList = [];
      reportList = res.data.items.map((item) => {
        return {
          product_id: item.product._id,
          sku: item.product.sku,
          upc: item.product.upc,
          asin: item.product.asin,
          name: item.product.name,
          warehouse: item.warehouse,
          warehouse_inbound: item.warehouse_inbound,
        };
      });
      let selectedWarehouse = {
        value: res.data.report.warehouse._id,
        label: res.data.report.warehouse.ID +
            " - " +
            res.data.report.warehouse.short_name +
            " - " +
            res.data.report.warehouse.country +
            " - " +
            res.data.report.warehouse.type.name,
      }
      this.setState({ datetime: res.data.report.datetime, selectedWarehouse, reportList, submittedInfo });
    });
  };

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

    if (this.state.datetime == null) {
      this.setState({
        messageOpen: true,
        messageType: "warning",
        messageContent: "Please select date!",
      });
      return false;
    }
    return true;
  };

  handleInputChange = (event, name, index) => {
    let { reportList } = this.state;
    reportList[index][name] = event.target.value;
    this.setState({ reportList });
  };

  handleSubmit = () => {
    if (this.validateSelection() == false) return;
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
      _id: this.props.match.params.id,
      items: newItem,
      warehouse: this.state.selectedWarehouse.value,
      datetime: this.state.datetime,
      editted_user: JSON.parse(localStorage.getItem("auth_user"))._id,
    };
    updateInventoryReportById(postData).then((res) => {
      this.getInitialState();
      this.setState({
        submitLoading: false,
        messageOpen: true,
        messageType: "success",
        messageContent: "Submitted successfully!",
      });
    });
  };

  render() {
    let {
      reportList,
      warehouseOptions,
      selectedWarehouse,
      datetime,
      submitLoading,
      messageType,
      messageOpen,
      messageContent,
      submittedInfo,
    } = this.state;

    const columns = [
      {
        name: "sku",
        label: "SKU",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "upc",
        label: "UPC",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "asin",
        label: "ASIN",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "warehouse",
        label: "Warehouse",
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: (dataIndex) => {
            return (
              <TextField
                name="warehouse"
                onChange={(e) =>
                  this.handleInputChange(e, "warehouse", dataIndex)
                }
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                value={this.state.reportList[dataIndex].warehouse}
              />
            );
          },
        },
      },
      {
        name: "warehouse_inbound",
        label: "Warehouse Inbound",
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: (dataIndex) => {
            return (
              <TextField
                name="warehouse_inbound"
                onChange={(e) =>
                  this.handleInputChange(e, "warehouse_inbound", dataIndex)
                }
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                value={this.state.reportList[dataIndex].warehouse_inbound}
              />
            );
          },
        },
      },
      {
        name: "warehouse_inbound",
        label: "Total In Location",
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: (dataIndex) => {
            return (
              <>
                {parseInt(this.state.reportList[dataIndex].warehouse) +
                  parseInt(this.state.reportList[dataIndex].warehouse_inbound)}
              </>
            );
          },
        },
      },
    ];

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
                  <span className="text-error">
                    {moment(submittedInfo.modifiedAt).format("LLLL")}
                  </span>{" "}
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
                <KeyboardDateTimePicker
                  className="mb-16 w-100"
                  margin="none"
                  id="mui-pickers-date"
                  label="Select DateTime"
                  inputVariant="standard"
                  type="text"
                  autoOk={true}
                  value={datetime}
                  onChange={(datetime) => this.setState({ datetime: datetime })}
                  KeyboardButtonProps={{
                    "aria-label": "change date time",
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item sm={6} xs={12}>
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
              <MUIDataTable
                className="pl-24 pr-24"
                title={"Report"}
                data={reportList}
                columns={columns}
                options={options}
              />
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
