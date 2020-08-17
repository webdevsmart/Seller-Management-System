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
import VariationEditorDialog from "./VariationEditorDialog";
import { getAllVariation, deleteVariation } from "./VariationService";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";

const options = {
  filterType: 'checkbox',
  customToolbarSelect: () => {},
  selectableRows: "none",
};

class ProductVariationList extends Component {
  state = {
    variationList: [],
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

  handleDeleteVariation = mid => {
    this.setState({
      mid,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = () => {
    deleteVariation(this.state.mid).then((res) => {
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
    getAllVariation().then((res) => {
      let tmpList = [];
      res.data.map((item) => {
        tmpList.push({
          id: item.unique_id,
          type: item.type,
          mid: item._id,
          value: item.value,
        });
      });
      this.setState({ variationList: tmpList });
    });
  }

  handleChangeCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  }

  render() {
    let {
      variationList,
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
        name: "type",
        label: "Type",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "value",
        label: "Value",
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
                    mid: this.state.variationList[dataIndex].mid,
                    shouldOpenEditorDialog: true
                  })
                }
              >
                <Icon color="primary">edit</Icon>
              </IconButton>  
              <IconButton onClick={() => this.handleDeleteVariation(this.state.variationList[dataIndex].mid)}>
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
          <Breadcrumb routeSegments={[{ name: "Product Variation" }]} />
        </div>
        <div className="flex flex-middle mb-16">
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.setState({ shouldOpenEditorDialog: true, mid: null })}
          >
            Add New Variation
          </Button>
        </div>
        <Card className="w-100 overflow-auto" elevation={6}>
          <MUIDataTable
            className="crud-table"
            title={"Variation List"}
            data={variationList}
            columns={columns}
            options={options}
          />

          {shouldOpenEditorDialog && (
            <VariationEditorDialog
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

export default ProductVariationList;
