import React, { Component } from "react";
import {
  IconButton,
  TableCell,
  Icon,
  Card
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import { Breadcrumb, ConfirmationDialog } from "egret";
import PartsEditorDialog from "./PartsEditorDialog";
import { getAllParts, deleteParts } from "./PartsService";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";

const columnStyleWithWidth = {
   width: "600px"
}
const options = {
  filterType: 'checkbox',
  customToolbarSelect: () => {},
  selectableRows: "none",
};

class PartsList extends Component {
  state = {
    rowsPerPage: 10,
    page: 0,
    partsList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    filterID: true,
    filterName: true,
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

  handleDeleteParts = mid => {
    this.setState({
      mid,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = () => {
    deleteParts(this.state.mid).then((res) => {
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
    getAllParts().then((res) => {
      let tmpList = [];
      res.data.map((item) => {
        tmpList.push({
          id: item.ID,
          name: item.name,
          mid: item._id,
          type: item.type.name,
          UM: item.UM.short_name,
          costUSD: item.cost_usd,
          supplierID: item.supplier_id.ID,
          supplierCountry: item.supplier_id.country,
          supplierName: item.supplier_id.name
        });
      });
      this.setState({ partsList: tmpList });
    });
  };

  handleChangeCheckbox = name => event => {
    this.setState({ [name]: event.target.checked });
  }

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          // '&:nth-child(1)': {
          //   width: 100
          // },
          // '&:nth-child(2)': {
          //   width: 200
          // },
        }
      }
    }
  })

  render() {
    let {
      partsList,
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
          customHeadRender: ({index, ...column}) => {
            return (
              <TableCell key={index} style={columnStyleWithWidth}>
                  {column.label}
              </TableCell>
            )
          }
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
        name: "UM",
        label: "UM",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "costUSD",
        label: "Cost USD",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "supplierID",
        label: "Supplier ID",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "supplierCountry",
        label: "Supplier Country",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "supplierName",
        label: "Supplier Name",
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
                    mid: this.state.partsList[dataIndex].mid,
                    shouldOpenEditorDialog: true
                  })
                }
              >
                <Icon color="primary">edit</Icon>
              </IconButton>  
              <IconButton onClick={() => this.handleDeleteParts(this.state.partsList[dataIndex].mid)}>
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
          <Breadcrumb routeSegments={[{ name: "Parts" }]} />
        </div>
        <Card className="w-100 overflow-auto" elevation={6}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              className="crud-table"
              title={"Parts List"}
              data={partsList}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>

          {shouldOpenEditorDialog && (
            <PartsEditorDialog
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

export default PartsList;
