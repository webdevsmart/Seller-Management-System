import React, { Component } from "react";
import {
  IconButton,
  Icon,
  Button,
  Card
} from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import PartsTypeEditorDialog from "./PartsTypeEditorDialog";
import { getAllPartsType, deletePartsType } from "./PartsTypeService";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";

const options = {
  filterType: 'checkbox',
  customToolbarSelect: () => {},
  selectableRows: "none"
};

class PartsTypeList extends Component {
  state = {
    partsTypeList: [],
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
      shouldOpenConfirmationDialog: false,
      mid: null,
    });
    this.updatePageData();
  };

  handleDeleteType = mid => {
    this.setState({
      mid,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = () => {
    deletePartsType(this.state.mid).then((res) => {
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
    getAllPartsType().then((res) => {
      let tmpList = [];
      res.data.map((item) => {
        tmpList.push({id: item.ID, name: item.name, mid: item._id});
      });
      this.setState({ partsTypeList: tmpList });
    });
  };

  handleChangeCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  }

  closeWarningMessage = () => {
    this.setState({warningOpen: false});
  }

  render() {
    let {
      partsTypeList,
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
                    mid: this.state.partsTypeList[dataIndex].mid,
                    shouldOpenEditorDialog: true
                  })
                }
              >
                <Icon color="primary">edit</Icon>
              </IconButton>  
              <IconButton onClick={() => this.handleDeleteType(partsTypeList[dataIndex].mid)}>
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
          <Breadcrumb routeSegments={[{ name: "Parts Type" }]} />
        </div>
        <div className="flex flex-middle mb-16">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState({ shouldOpenEditorDialog: true, uid: null })}
          >
            Add New Parts Type
          </Button>
        </div>
        <Card className="w-100 overflow-auto" elevation={6}>
          <MUIDataTable
              className="crud-table"
              title={"Parts Type List"}
              data={partsTypeList}
              columns={columns}
              options={options}
            />
          
          {shouldOpenEditorDialog && (
            <PartsTypeEditorDialog
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

export default PartsTypeList;
