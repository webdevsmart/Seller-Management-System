import React, { Component } from "react";
import axios from 'axios';
import {
  IconButton,
  Icon,
  Button,
  Card
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { Link } from "react-router-dom";
import { getAllSuppliers, deleteSupplier } from "./SupplierService";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";

const options = {
  filterType: 'checkbox',
  customToolbarSelect: () => {},
  selectableRows: "none"
};

class SupplierList extends Component {
  state = {
    supplierList: [],
    shouldOpenConfirmationDialog: false,
    warningMessage: "",
    warningOpen: false,
  };

  setPage = page => {
    this.setState({ page });
  };

  setRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false
    });
    this.updatePageData();
  };

  handleDeleteSupplier = mid => {
    this.setState({
      mid,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = () => {
    deleteSupplier(this.state.mid).then((res) => {
      this.handleDialogClose();
    }).catch((error) => {
      this.setState({warningMessage: error.response.data.message});
      this.setState({warningOpen: true});
      this.handleDialogClose();
    });
  };

  componentDidMount() {
    this.updatePageData();
  }

  updatePageData = () => {
    getAllSuppliers().then((res) => {
      let tmpList = [];
      res.data.map((item) => {
        tmpList.push({
          id: item.ID,
          name: item.name,
          mid: item._id,
          country: item.country,
          main_products_services: item.main_products_services,
          type: item.type.name
        });
      });
      this.setState({ supplierList: tmpList });
    });
  };

  closeWarningMessage = () => {
    this.setState({warningOpen: false});
  }

  render() {
    let {
      supplierList,
      shouldOpenConfirmationDialog,
      warningOpen,
      warningMessage
    } = this.state;
    
    const columns = [
      {
      name: "id",
      label: "Supplier ID",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
      name: "name",
      label: "Supplier Name",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
      name: "country",
      label: "Supplier Country",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
      name: "type",
      label: "Type",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
      name: "main_products_services",
      label: "Main Product/Service",
      options: {
        filter: true,
        sort: true,
      }
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
                  this.props.history.push(`/supplier/edit/${supplierList[dataIndex].mid}`)
                }
              >
                <Icon color="primary">edit</Icon>
              </IconButton>  
              <IconButton onClick={() => this.handleDeleteSupplier(supplierList[dataIndex].mid)}>
                <Icon color="error">delete</Icon>
              </IconButton>
              </>
            );
          }
        }
      },
    ];

    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Supplier List" }]} />
        </div>

        <Link to="/supplier/add-new">
          <Button
            className="mb-16"
            variant="contained"
            color="primary"
            onClick={() => this.setState({ shouldOpenEditorDialog: true, uid: null })}
          >
            Add New Supplier
          </Button>
        </Link>
        <Card className="w-100 overflow-auto" elevation={6}>
          <MUIDataTable
            className="crud-table"
            title={"Supplier List"}
            data={supplierList}
            columns={columns}
            options={options}
          />

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
            horizontal: "right"
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

export default SupplierList;
