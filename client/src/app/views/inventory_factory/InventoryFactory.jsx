import React, { Component } from "react";
import {
  Card,
  Grid,
  Button,
  Snackbar,
  CircularProgress,
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
import { addNewFactoryReport } from "./InventoryFactoryService";
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
    getAllProducts().then((res) => {
      let reportList = [];
      reportList = res.data.map((item) => {
        return {
          product_id: item._id,
          sku: item.sku,
          upc: item.upc,
          asin: item.asin,
          name: item.name,
          ready_to_ship: 0,
          in_production: 0,
        };
      });
      this.setState({ reportList });
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
        ready_to_ship: item.ready_to_ship,
        in_production: item.in_production,
        total: parseFloat(item.ready_to_ship) + parseFloat(item.in_production),
      });
    });
    let postData = {
      items: newItem,
      ID: "IF" + generateRandomId(),
      warehouse: this.state.selectedWarehouse.value,
      datetime: this.state.datetime,
      submitted_user: JSON.parse(localStorage.getItem("auth_user"))._id,
      editted_user: JSON.parse(localStorage.getItem("auth_user"))._id,
    };
    addNewFactoryReport(postData).then((res) => {
      this.getInitialState();
      this.setState({
        selectedWarehouse: null,
        datetime: new Date(),
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
        name: "ready_to_ship",
        label: "Ready to Ship",
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: (dataIndex) => {
            return (
              <TextField
                name="ready_to_ship"
                onChange={(e) =>
                  this.handleInputChange(e, "ready_to_ship", dataIndex)
                }
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                value={this.state.reportList[dataIndex].ready_to_ship}
              />
            );
          },
        },
      },
      {
        name: "in_production",
        label: "In Production",
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: (dataIndex) => {
            return (
              <TextField
                name="in_production"
                onChange={(e) =>
                  this.handleInputChange(e, "in_production", dataIndex)
                }
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                value={this.state.reportList[dataIndex].in_production}
              />
            );
          },
        },
      },
      {
        name: "total",
        label: "Total",
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: (dataIndex) => {
            return (
              <>
                {parseInt(this.state.reportList[dataIndex].ready_to_ship) +
                  parseInt(this.state.reportList[dataIndex].in_production)}
              </>
            );
          },
        },
      },
    ];

    return (
      <div className="m-sm-30">
        <SimpleCard title="Inventory Factory Report">
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
