import React, { Component } from "react";
import axios from 'axios';
import {
  IconButton,
  Icon,
  Button,
  Card
} from "@material-ui/core";
import { Breadcrumb, ConfirmationDialog } from "egret";
import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import PartsUMEditorDialog from "./PartsUMEditorDialog";
import { getAllPartsUM, deletePartsUM } from "./PartsUMService";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";
import shortid from "shortid";

const options = {
  filterType: 'checkbox',
  customToolbarSelect: () => {},
  selectableRows: "none"
};


class PartsUMList extends Component {
  state = {
    partsUMList: [],
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

  handleDeleteUM = mid => {
    this.setState({
      mid,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = () => {
    deletePartsUM(this.state.mid).then((res) => {
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
    getAllPartsUM().then((res) => {
      let tmpList = [];
      res.data.map((item) => {
        tmpList.push({id: item.ID, name: item.name, short_name: item.short_name, mid: item._id});
      });
      this.setState({ partsUMList: tmpList });
    });
  };

  closeWarningMessage = () => {
    this.setState({warningOpen: false});
  }

  render() {
    let {
      partsUMList,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      warningMessage,
      warningOpen
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
      name: "short_name",
      label: "Short Name",
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
                    mid: this.state.partsUMList[dataIndex].mid,
                    shouldOpenEditorDialog: true
                  })
                }
              >
                <Icon color="primary">edit</Icon>
              </IconButton>  
              <IconButton onClick={() => this.handleDeleteUM(partsUMList[dataIndex].mid)}>
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
          <Breadcrumb routeSegments={[{ name: "Parts UM" }]} />
        </div>
        <div className="flex flex-middle mb-16">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState({ shouldOpenEditorDialog: true, uid: null })}
          >
            Add New Parts UM
          </Button>
        </div>
        <Card className="w-100 overflow-auto" elevation={6}>
            <MUIDataTable
              className="crud-table"
              title={"Parts UM List"}
              data={partsUMList}
              columns={columns}
              options={options}
            />

          {shouldOpenEditorDialog && (
            <PartsUMEditorDialog
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

export default PartsUMList;
