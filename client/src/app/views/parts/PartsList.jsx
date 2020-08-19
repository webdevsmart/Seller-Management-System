import React, { Component } from "react";
import {
  IconButton,
  TableCell,
  Icon,
  Button,
  Card
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import { Breadcrumb, ConfirmationDialog } from "egret";
import PartsEditorDialog from "./PartsEditorDialog";
import { getAllParts, deleteParts } from "./PartsService";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";
import { generateRandomId } from "utils";
import { addNewParts } from "../parts/PartsService";

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

  makeid = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  handleAddFakeParts = () => {
    let fakeParts = [];
    let parts = ["5f3a13ec2eef4c2b6d3fcf44", "5f3a13f02eef4c2b6d3fcf45", "5f3a13f42eef4c2b6d3fcf46"];
    let parts_ums = ['5f3a13ca2eef4c2b6d3fcf40', '5f3a13d92eef4c2b6d3fcf42', '5f3a13e42eef4c2b6d3fcf43', '5f3a14152eef4c2b6d3fcf48'];
    for (let i = 0 ; i < 100 ; i ++) {
      fakeParts.push({
        ID: 'P' + generateRandomId(),
        name: 'Part - ' + this.makeid(5),
        type: parts[i % 3],
        cost_usd: (Math.random() * (100 - 10) + 10).toFixed(2),
        UM: parts_ums[i % 4],
        qty: parseInt(Math.random() * (100 - 10) + 10),
        supplier_id: '5f3bc4b3a1f1fe4452dc0016',
      });
    }
    addNewParts(fakeParts).then((res1) => {
      alert('2222');
    });
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
          <Button onClick={this.handleAddFakeParts}>ADD Fake Parts</Button>
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
