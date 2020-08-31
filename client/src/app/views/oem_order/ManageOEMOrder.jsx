import React, { Component } from "react";
import { IconButton, Icon, Button, Card } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import { Breadcrumb, ConfirmationDialog } from "egret";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";
import { getAllOrders, downloadPartsExcel } from "./OEMOrderService";
import moment from "moment";
import { Link } from "react-router-dom";
import Axios from "axios";
import FileSaver from 'file-saver';

class ManageOEMOrder extends Component {
  state = {
    orderList: [],
    warningOpen: false,
    warningMessage: "",
    selectedOrders: [],
  };

  componentDidMount() {
    this.updatePageData();
  }

  updatePageData = () => {
    getAllOrders().then((res) => {
      let orderList = [];
      orderList = res.data.map((item) => {
        return {
          _id: item._id,
          ID: item.ID,
          warehouse: `${item.warehouse_for_qty.ID} - ${item.warehouse_for_qty.short_name} - ${item.warehouse_for_qty.country} - ${item.warehouse_for_qty.type.name}`,
          user: item.submitted_user.name,
          date_time: moment(item.date).format("LLLL"),
        };
      });
      this.setState({orderList});
    });
  };

  closeWarningMessage = () => {
    this.setState({ warningOpen: false });
  };

  handleSelectionChange = (rowsSelected) => {
    let selectedOrders = [];
    rowsSelected.map((row) => {
      selectedOrders.push(this.state.orderList[row]._id)
    });
    this.setState({selectedOrders});
  }

  downloadPartsList = () => {
    if (this.state.selectedOrders.length == 0) {
      this.setState({warningOpen: true, warningMessage: "Please select orders!"});
      return;
    }
    downloadPartsExcel({ids: this.state.selectedOrders}).then((res) => {
      const date = new Date();

      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      FileSaver.saveAs(blob, 'parts_list_' + moment(date).format("YYYY-MM-DD(H:m:s)") + '.xlsx');
    });
  }

  render() {
    let { orderList, warningMessage, warningOpen } = this.state;

    const options = {
      filterType: 'checkbox',
      download: false,
      print: false,
      selectToolbarPlacement: 'none',
      responsive: 'stacked',
      onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
        this.handleSelectionChange(rowsSelected);
      },
    };
    
    const columns = [
      {
        name: "ID",
        label: "ID",
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: "date_time",
        label: "Date Time",
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: "user",
        label: "User",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "warehouse",
        label: "Warehouse",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "action",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex) => {
            return (
              <>
                <Link to={`/oem-order/view/${orderList[dataIndex]._id}`}>
                  <IconButton>
                    <Icon color="primary">visibility</Icon>
                  </IconButton>
                </Link>
              </>
            );
          },
        },
      },
    ];

    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Manage Reports" }]} />
        </div>
        <Button className="mb-24" variant="contained" color="primary" onClick={this.downloadPartsList}>
          Download Parts List
        </Button>
        <Card className="w-100 overflow-auto" elevation={6}>
          <MUIDataTable
            className="pl-24 pr-24"
            title={"Report List"}
            data={orderList}
            columns={columns}
            options={options}
          />
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={warningOpen}
          autoHideDuration={6000}
          onClose={this.closeWarningMessage}
        >
          <MySnackbarContentWrapper
            onClose={this.closeWarningMessage}
            variant="warning"
            message={warningMessage}
          />
        </Snackbar>
      </div>
    );
  }
}

export default ManageOEMOrder;
