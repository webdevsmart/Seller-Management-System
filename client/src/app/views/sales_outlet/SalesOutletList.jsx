import React, { Component } from "react";
import { IconButton, Icon, Button, Card } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import { Breadcrumb, ConfirmationDialog } from "egret";
import SalesOutletEditorDialog from "./SalesOutletEditorDialog";
import { getAllSalesOutlets, deleteSalesOutlet } from "./SalesOutletService";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";

const options = {
  filterType: "checkbox",
  customToolbarSelect: () => {},
  selectableRows: "none",
};

class SalesOutletList extends Component {
  state = {
    outletList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    warningOpen: false,
    warningMessage: "",
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

  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false,
    });
    this.updatePageData();
  };

  handleDeleteSalesOutlet = (mid) => {
    this.setState({
      mid,
      shouldOpenConfirmationDialog: true,
    });
  };

  handleConfirmationResponse = () => {
    deleteSalesOutlet(this.state.mid)
      .then((res) => {
        this.handleDialogClose();
      })
      .catch((error) => {
        this.setState({ warningMessage: error.response.data.message });
        this.setState({ warningOpen: true });
        this.handleDialogClose();
      });
  };

  componentDidMount() {
    this.updatePageData();
  }

  updatePageData = () => {
    getAllSalesOutlets().then((res) => {
      let tmpList = [];
      res.data.map((item) => {
        tmpList.push({
          id: item.ID,
          name: item.name,
          shortName: item.short_name,
          location: item.location,
          warehouse: item.warehouse.ID + " - " + item.warehouse.short_name,
          mid: item._id,
        });
      });
      this.setState({ outletList: tmpList });
    });
  };

  closeWarningMessage = () => {
    this.setState({ warningOpen: false });
  };

  render() {
    let {
      outletList,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      warningOpen,
      warningMessage,
    } = this.state;

    const columns = [
      {
        name: "id",
        label: "ID",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "shortName",
        label: "Short Name",
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
        name: "location",
        label: "Location",
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
                <IconButton
                  onClick={() =>
                    this.setState({
                      mid: this.state.outletList[dataIndex].mid,
                      shouldOpenEditorDialog: true,
                    })
                  }
                >
                  <Icon color="primary">edit</Icon>
                </IconButton>
                <IconButton
                  onClick={() =>
                    this.handleDeleteSalesOutlet(
                      this.state.outletList[dataIndex].mid
                    )
                  }
                >
                  <Icon color="error">delete</Icon>
                </IconButton>
              </>
            );
          },
        },
      },
    ];

    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Sales Outlet" }]} />
        </div>

        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() =>
            this.setState({ shouldOpenEditorDialog: true, mid: null })
          }
        >
          Add New Sales Outlet
        </Button>
        <Card className="w-100 overflow-auto" elevation={6}>
          <MUIDataTable
            className="pl-24 pr-24"
            title={"Sales Outlet List"}
            data={outletList}
            columns={columns}
            options={options}
          />
          {shouldOpenEditorDialog && (
            <SalesOutletEditorDialog
              handleClose={this.handleDialogClose}
              open={shouldOpenEditorDialog}
              mid={this.state.mid}
            />
          )}

          {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={this.handleDialogClose}
              onYesClick={this.handleConfirmationResponse}
              text="Are you sure to delete?"
            />
          )}
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

export default SalesOutletList;
