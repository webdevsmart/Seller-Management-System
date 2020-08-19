import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  TableCell,
  DialogContent,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MUIDataTable from "mui-datatables";
import { ConfirmationDialog } from "egret";
import CustomToolbar from "./CustomToolbar";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';

const columnStyleWithWidth = {
  width: "600px"
}

class PartsDialog extends Component {
  state = {
    partsData: [],
    tableData: [],
    selectedPartsID: [],
    selectedRows: [],
    shouldOpenConfirmationDialog: false,
    unSelectID: null,
  };

  handleChange = (event, source) => {
    event.persist();
  };

  handleFormSubmit = () => {
  };

  handleDialogClose = () => {
    this.setState({shouldOpenConfirmationDialog: false, unSelectID: null});
  }

  componentWillMount() {
    let {allSelectedPartsIndex, partsList} = this.props;
    let tempAllSelectedPartsIndex = [];
    tempAllSelectedPartsIndex.push(...allSelectedPartsIndex);
    if (partsList) {
      let {partsData, selectedRows} = this.state;
      partsData = [];
      selectedRows = [];
      partsList.map((part, index) => {
        partsData.push({
          _id: part._id,
          ID: part.ID,
          name: part.name,
          type: part.type.name,
          supplier_country: part.supplier_id.country,
          UM: part.UM.short_name,
          u_price: '$' + part.cost_usd,
          supplier_name: part.supplier_id.name,
        });
        if (tempAllSelectedPartsIndex.includes(part._id))
          selectedRows.push(index);
      });
      this.setState({partsData: partsData, tableData: partsData, selectedPartsID: tempAllSelectedPartsIndex, selectedRows, unSelectID: null}, () => {
      });
    }
  }

  addSelectedParts = () => {
    let {selectedPartsID} = this.state;
    this.props.addParts(selectedPartsID);
    this.props.handleClose();
  }

  showSelectedRows = (isAll) => {
    let {tableData, partsData, selectedPartsID, selectedRows} = this.state;
    if (isAll == false) {
      tableData = [];
      selectedRows = [];
      selectedPartsID.map((partIndex, i) => {
        const item = partsData.filter(obj => { return obj._id === partIndex });
        tableData.push(item[0]);
        selectedRows.push(i);
      });
    }
    else {
      tableData = partsData;
      selectedRows = [];
      selectedPartsID.map((partIndex) => {
        const index = partsData.map(function(x) {return x._id; }).indexOf(partIndex);
        if (index != -1)
          selectedRows.push(index);
      });
    }
    this.setState({tableData: tableData, selectedRows: selectedRows});
  }

  handleSelectionChange = (currentRowsSelected, rowsSelected) => {

    let { selectedPartsID, tableData } = this.state;
    if (currentRowsSelected.length == tableData.length)
      this.setState({selectedRows: rowsSelected, selectedPartsID: tableData.map(a => a._id)});
    else if (currentRowsSelected.length == 0) {
      this.setState({shouldOpenConfirmationDialog: true, unSelectID: -1});
    }
    else{
      if (selectedPartsID.includes(tableData[currentRowsSelected[0].index]._id)) {
        this.setState({shouldOpenConfirmationDialog: true, unSelectID: currentRowsSelected[0].index});
      }
      else {
        selectedPartsID.push(tableData[currentRowsSelected[0].index]._id);
        this.setState({selectedRows: rowsSelected, selectedPartsID: selectedPartsID});
      }
    }
  }

  handleConfirmationResponse = () => {
    let {selectedRows, selectedPartsID, tableData, unSelectID} = this.state;
    if (unSelectID == -1) {
      this.setState({selectedRows: [], selectedPartsID: [], shouldOpenConfirmationDialog: false, unSelectID: null});
    }
    else {
      const index = selectedRows.indexOf(unSelectID);
      if (index > -1) {
        selectedRows.splice(index, 1);
        const newIndex = selectedPartsID.indexOf(tableData[unSelectID]._id);
        if (newIndex > -1) {
          selectedPartsID.splice(newIndex, 1);
          this.setState({selectedRows, selectedPartsID, shouldOpenConfirmationDialog: false, unSelectID: null});
        }
      }
    }
  }
  
  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          // textAlign: 'center',
        }
      },
      MUIDataTableBodyRow: {
      }
    }
  })

  render() {
    let { open, handleClose } = this.props;
    let { tableData, selectedRows, shouldOpenConfirmationDialog } = this.state;
    const columns = [
    {
      name: "ID",
      label: "ID Code",
      options: {
      filter: false,
      sort: true,
      }
    },
      {
      name: "name",
      label: "Name",
      options: {
      filter: false,
      sort: false,
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
      sort: false,
      }
    },
    {
      name: "supplier_name",
      label: "Supplier Name",
      options: {
      filter: false,
      sort: false,
      }
    },
    {
      name: "supplier_country",
      label: "Supplier Country",
      options: {
      filter: true,
      sort: false,
      }
    },
    {
      name: "UM",
      label: "UM",
      options: {
      filter: false,
      sort: false,
      }
    },
    {
      name: "u_price",
      label: "UPrice",
      options: {
      filter: false,
      sort: false,
      }
    },
    ];

    const options = {
      filterType: 'checkbox',
      download: false,
      print: false,
      rowsSelected: selectedRows,
      selectToolbarPlacement: 'none',
      responsive: 'stacked',
      onRowSelectionChange: (currentRowsSelected, allRowsSelected, rowsSelected) => {
        this.handleSelectionChange(currentRowsSelected, rowsSelected);
      },
      customToolbar: () => {
        return (
          <CustomToolbar handleClick={this.showSelectedRows} />
        );
      }
    };

    return (
      <Dialog fullScreen onClose={handleClose} open={open}>
        <AppBar style={{position: 'relative'}} className="bg-default">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" style={{flex: 1}}>
              Advanced Search
            </Typography>
            <Button autoFocus variant="contained" color="primary" onClick={this.addSelectedParts}>
              Add
            </Button>
          </Toolbar>
        </AppBar>
        <div className="p-10 mt-20">
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <MuiThemeProvider theme={this.getMuiTheme()}>
              <MUIDataTable
                title={"Parts List"}
                data={tableData}
                columns={columns}
                options={options}
              />
            </MuiThemeProvider>
          </ValidatorForm>
        </div>
        {shouldOpenConfirmationDialog && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={this.handleDialogClose}
            onYesClick={this.handleConfirmationResponse}
            text="Are you sure to unselect?"
          />
        )}
      </Dialog>
    );
  }
}
export default PartsDialog
