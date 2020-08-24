import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getSalesOutletById, updateSalesOutlet, addNewSalesOutlet } from "./SalesOutletService";
import { generateRandomId } from "utils";
import { countries } from "../../constants";
import { getAllLocations } from "../inventory_warehouse_location/LocationService";
import CustomSelect from "../../components/CustomSelect/CustomSelect";

class SalesOutletEditorDialog extends Component {
  state = {
    ID: "",
    shortName: "",
    name: "",
    locationList: countries,
    selectedLocation: null,
    warehouseList: [],
    selectedWarehouse: null,
  };

  handleChange = (event, source) => {
    event.persist();
    this.setState({
    [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = () => {
    let { _id } = this.state;
    if (_id) {
      updateSalesOutlet({
        _id,
        short_name: this.state.shortName,
        name: this.state.name,
        location: this.state.selectedLocation.value,
        warehouse: this.state.selectedWarehouse.value,
      }).then(() => {
        this.props.handleClose();
      });
    } else {
      const newCat = {
          ID: 'ST' + generateRandomId(),
          short_name: this.state.shortName,
          name: this.state.name,
          location: this.state.selectedLocation.value,
          warehouse: this.state.selectedWarehouse.value,
      }
      addNewSalesOutlet(newCat).then((res) => {
        this.props.handleClose();
      });
    }
  };

  componentDidMount() {
    getAllLocations().then((res) => {
        let warehouseList = res.data.map((item) => { return { ...item, label: item.ID + ' - ' + item.short_name, value: item._id  } });
        this.setState({warehouseList});
    })
  }

  componentWillMount() {
    if (this.props.mid){
        
        getSalesOutletById(this.props.mid).then((res) => {
            const curSalesOutlet = {
              _id: res.data._id,
              shortName: res.data.short_name,
              name: res.data.name,
              selectedLocation: {label: res.data.location, value: res.data.location},
              selectedWarehouse: {label: res.data.warehouse.ID + ' - ' + res.data.warehouse.short_name, value: res.data.warehouse._id},
            };
            this.setState({ ...curSalesOutlet });
          });
    }
    else {
        this.setState({
            ID: "",
            name: "",
            shortName: "",
            selectedLocation: null,
            selectedWarehouse: null,
        });
    }
  }

  render() {
    let { name, shortName, warehouseList, locationList, selectedWarehouse, selectedLocation } = this.state;
    let { open, handleClose } = this.props;

    return (
      <Dialog onClose={handleClose} open={open} maxWidth={'md'} fullWidth={true}>
        <div className="p-24">
          <h4 className="mb-20">Update Sales Outlet</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={4}  style={{paddingBottom: '250px'}}>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label="Name"
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label="Short Name"
                  onChange={this.handleChange}
                  type="text"
                  name="shortName"
                  value={shortName}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomSelect
                    textFieldProps={{
                    label: "Select Warehouse",
                    InputLabelProps: {
                        htmlFor: "react-select-single",
                        shrink: true,
                    },
                    placeholder: "",
                    }}
                    options={warehouseList}
                    handleChange={(data) => this.setState({selectedWarehouse: data})}
                    selectedValue={selectedWarehouse}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomSelect
                    textFieldProps={{
                    label: "Select Location",
                    InputLabelProps: {
                        htmlFor: "react-select-single",
                        shrink: true,
                    },
                    placeholder: "",
                    }}
                    options={locationList}
                    handleChange={(data) => this.setState({selectedLocation: data})}
                    selectedValue={selectedLocation}
                />
              </Grid>
            </Grid>

            <div className="flex flex-space-between flex-middle">
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Button onClick={() => this.props.handleClose()}>Cancel</Button>
            </div>
          </ValidatorForm>
        </div>
      </Dialog>
    );
  }
}

export default SalesOutletEditorDialog;
