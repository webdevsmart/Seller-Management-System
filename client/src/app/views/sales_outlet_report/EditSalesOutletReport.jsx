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
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { SimpleCard } from "egret";
import "date-fns";
import MUIDataTable from "mui-datatables";
import DateFnsUtils from "@date-io/date-fns";
import NumberFormat from "react-number-format";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import {
  getAllSalesOutlets,
} from "../sales_outlet/SalesOutletService";
import {
  updateSalesOutletReport,
  getSalesReportById,
} from "./SalesOutletReportService";
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

class EditSalesOutletReport extends Component {
  state = {
    salesOutletList: [],
    selectedSalesOutlet: null,
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
    this.getInitialState();
    getAllSalesOutlets().then((res) => {
      let salesOutletList = res.data.map((item) => {
        return { value: item._id, label: `${item.ID} - ${item.short_name} - ${item.name} - ${item.location}` };
      });
      this.setState({ salesOutletList });
    });
  }

  getInitialState = () => {
    getSalesReportById(this.props.match.params.id).then((res) => {
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
          sold: item.sold,
          returned: item.returned,
          refunded: item.refunded,
        };
      });
      let selectedSalesOutlet = {
          value: res.data.report.sales_outlet._id, 
          label: `${res.data.report.sales_outlet.ID} - ${res.data.report.sales_outlet.short_name} - ${res.data.report.sales_outlet.name} - ${res.data.report.sales_outlet.location}`
      }
      this.setState({ reportList, date: res.data.report.date, selectedSalesOutlet, submittedInfo });
    });
  };

  closeMessage = () => {
    this.setState({ messageOpen: false });
  };

  validateSelection = () => {
    if ( this.state.selectedSalesOutlet == null ) {
      this.setState({
        messageOpen: true,
        messageType: "warning",
        messageContent: "Please select sales outlet!",
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

  handleInputChange = (event, name, index) => {
    let { reportList } = this.state;
    reportList[index][name] = event.target.value;
    this.setState({ reportList });
  };

  handleSelectSalesOutlet = (data) => {
    this.setState({ selectedSalesOutlet: data });
  };

  handleSubmit = () => {
    if (this.validateSelection() == false) return;
    let { reportList } = this.state;
    this.setState({ submitLoading: true });
    let newItem = [];
    reportList.map((item) => {
      newItem.push({
        product: item.product_id,
        sold: item.sold,
        returned: item.returned,
        refunded: item.refunded,
      });
    });
    let postData = {
      _id: this.props.match.params.id,
      items: newItem,
      sales_outlet: this.state.selectedSalesOutlet.value,
      date: this.state.date,
      editted_user: JSON.parse(localStorage.getItem("auth_user"))._id,
    };
    updateSalesOutletReport(postData).then((res) => {
      this.setState({
        submitLoading: false,
        messageOpen: true,
        messageType: "success",
        messageContent: "Submitted successfully!",
        selectedSalesOutlet: null,
        date: new Date(),
      });
      this.getInitialState();
    });
  };

  render() {
    let {
      reportList,
      salesOutletList,
      selectedSalesOutlet,
      date,
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
        name: "sold",
        label: "SOLD",
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: (dataIndex) => {
            return (
              <TextField
                onChange={(e) => this.handleInputChange(e, "sold", dataIndex)}
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                value={this.state.reportList[dataIndex].sold}
              />
            );
          },
        },
      },
      {
        name: "returned",
        label: "RETURNED",
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: (dataIndex) => {
            return (
              <TextField
                onChange={(e) =>
                  this.handleInputChange(e, "returned", dataIndex)
                }
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                value={this.state.reportList[dataIndex].returned}
              />
            );
          },
        },
      },
      {
        name: "refunded",
        label: "REFUNDED",
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: (dataIndex) => {
            return (
              <TextField
                onChange={(e) =>
                  this.handleInputChange(e, "refunded", dataIndex)
                }
                InputProps={{
                  inputComponent: NumberFormatCustom,
                }}
                value={this.state.reportList[dataIndex].refunded}
              />
            );
          },
        },
      },
      {
        name: "",
        label: "Total",
        options: {
          filter: false,
          sort: false,
          customBodyRenderLite: (dataIndex) => {
            return (
              <>
                {parseInt(this.state.reportList[dataIndex].sold) +
                  parseInt(this.state.reportList[dataIndex].returned) +
                  parseInt(this.state.reportList[dataIndex].refunded)}
              </>
            );
          },
        },
      },
    ];

    return (
      <div className="m-sm-30">
        <SimpleCard title="Sales Outlet Report">
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
                  label: "Select Sales Outlet",
                  InputLabelProps: {
                    htmlFor: "react-select-single",
                    shrink: true,
                  },
                  placeholder: "",
                }}
                options={salesOutletList}
                handleChange={(data) => this.handleSelectSalesOutlet(data)}
                selectedValue={selectedSalesOutlet}
              />
            </Grid>
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
                  value={date}
                  format={"yyyy-MMM"}
                  onChange={(date) => this.setState({ date: date })}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
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

export default EditSalesOutletReport;
