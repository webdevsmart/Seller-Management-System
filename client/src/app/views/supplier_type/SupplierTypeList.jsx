import React, { Component } from "react";
import {
  IconButton,
  Icon,
  Button,
  Card
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import { Breadcrumb, ConfirmationDialog } from "egret";
import SupplierTypeEditorDialog from "./SupplierTypeEditorDialog";
import { getAllSupplierTypes, deleteSupplierType } from "./SupplierTypeService";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";

const options = {
  filterType: 'checkbox',
  customToolbarSelect: () => {},
  selectableRows: "none"
};

class SupplierTypeList extends Component {
  state = {
    supplierTypeList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    warningOpen: false,
    warningMessage: "",
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

  handleDeleteSupplierType = mid => {
    this.setState({
      mid,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = () => {
    deleteSupplierType(this.state.mid).then((res) => {
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
    getAllSupplierTypes().then((res) => {
      let tmpList = [];
      res.data.map((item) => {
        tmpList.push({id: item.ID, name: item.name, mid: item._id});
      });
      this.setState({ supplierTypeList: tmpList });
    });
  };

  closeWarningMessage = () => {
    this.setState({warningOpen: false});
  }

  render() {
    let {
      supplierTypeList,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      warningOpen,
      warningMessage
    } = this.state;
    
    const columns = [
      {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
      name: "name",
      label: "Name",
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
                  this.setState({
                    mid: this.state.supplierTypeList[dataIndex].mid,
                    shouldOpenEditorDialog: true
                  })
                }
              >
                <Icon color="primary">edit</Icon>
              </IconButton>  
              <IconButton onClick={() => this.handleDeleteSupplierType(this.state.supplierTypeList[dataIndex].mid)}>
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
          <Breadcrumb routeSegments={[{ name: "Supplier Type" }]} />
        </div>

        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ shouldOpenEditorDialog: true, mid: null })}
        >
          Add New Supplier Type
        </Button>
        <Card className="w-100 overflow-auto" elevation={6}>
          <MUIDataTable
            className="crud-table"
            title={"Supplier Type List"}
            data={supplierTypeList}
            columns={columns}
            options={options}
          />
          {shouldOpenEditorDialog && (
            <SupplierTypeEditorDialog
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

export default SupplierTypeList;
