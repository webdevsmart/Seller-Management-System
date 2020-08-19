import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Grid,
  Tooltip,
  FormControlLabel,
  Switch,
  DialogContent,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import MUIDataTable from "mui-datatables";
import EditIcon from "@material-ui/icons/Create";
import FilterIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";

import { generateRandomId } from "utils";

class PartsDialog extends Component {
  state = {
    partsData: [],
  };

  handleChange = (event, source) => {
    event.persist();
  };

  handleFormSubmit = () => {
  };

  componentWillMount() {
    if (this.props.partsList) {
      let {partsData} = this.state;
      partsData = [];
      this.props.partsList.map((part) => {
        partsData.push({
          ID: part.ID,
          name: part.name,
          type: part.type.name,
          supplier_country: part.supplier_id.country,
          UM: part.UM.short_name,
          u_price: '$' + part.cost_usd,
        });
      });
      this.setState({partsData});
    }
  }

  addSelectedParts = (selectedRows) => {
    this.props.setParts(selectedRows);
    this.props.handleClose();
    console.log(selectedRows);
  }

  render() {
    let { open, handleClose } = this.props;

    const columns = [
    {
      name: "ID",
      label: "ID Code",
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
      sort: false,
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
      filter: true,
      sort: false,
      }
    },
    {
      name: "u_price",
      label: "UPrice",
      options: {
      filter: true,
      sort: false,
      }
    },
    ];

    const options = {
      filterType: 'checkbox',
      download: false,
      print: false,
      rowsSelected: this.props.rowsSelected,
      customToolbarSelect: selectedRows => (
        <>
        <Tooltip title="filter">
          <Button
            variant="contained"
            color="primary"
            className="m-10"
            onClick={() => this.addSelectedParts(selectedRows)}
          >
            Add Selected
          </Button>
        </Tooltip>
        </>
      )
    };

    let {partsData} = this.state;

    return (
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="lg" scroll={'paper'}>
        <DialogTitle id="scroll-dialog-title">Advanced Search</DialogTitle>
        <DialogContent>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={4}>
                <MUIDataTable
                  title={"Parts List"}
                  data={partsData}
                  columns={columns}
                  options={options}
                />
            </Grid>
          </ValidatorForm>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default PartsDialog;
