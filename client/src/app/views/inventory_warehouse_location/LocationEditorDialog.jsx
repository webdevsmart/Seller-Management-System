import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getLocationById, updateLocation, addNewLocation } from "./LocationService";
import { getAllLocationTypes } from "../warehouse_location_type/LocationTypeService";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { generateRandomId } from "utils";
import { countries } from "../../constants";

class LocationEditorDialog extends Component {
  state = {
    ID: "",
    short_name: "",
    name: "",
    country: "",
    selected_country: null,
    type: null,
    selected_type: null,
    typeList: [],
  };

  handleChange = (event, source) => {
    event.persist();
    this.setState({
    [event.target.name]: event.target.value
    });
  };

  handleSelectCountry = (data) => {
    this.setState({selected_country: data, country: data.value});
  }

  handleSelectType = (data) => {
    this.setState({selected_type: data, type: data.value});
  }

  handleFormSubmit = () => {
    let { _id } = this.state;
    if (_id) {
      updateLocation({
        ...this.state
      }).then(() => {
        this.props.handleClose();
      });
    } else {
      const newLocation = {
        ...this.state,
        ID: 'IWL' + generateRandomId(),
      }
      addNewLocation(newLocation).then((res) => {
        this.props.handleClose();
      });
    }
  };

  componentDidMount() {
    getAllLocationTypes().then((res) => {
      this.setState({ typeList: res.data.map(item => ({ ...item, value: item._id, label: item.name })) });
    });
  }

  componentWillMount() {
    if (this.props.mid) {
      getLocationById(this.props.mid).then((data) => {
        let selected_type = {label: data.data.type.name, value: data.data.type._id};
        this.setState({
          ...data.data,
          selected_country: {label: data.data.country, value: data.data.country},
          selected_type,
        });
      });
    }
    else {
        this.setState({
            ID: "",
            short_name: "",
            name: "",
            country: "",
            selected_country: null,
            selected_type: null,
            type: null,
        });
    }
  }

  render() {
    let { name, short_name, selected_country, selected_type, typeList } = this.state;
    let { open, handleClose } = this.props;

    return (
      <Dialog onClose={handleClose} open={open} maxWidth={'md'} fullWidth={true}>
        <div className="p-24">
          <h4 className="mb-20">Update Warehouse Location</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid container spacing={4} style={{marginBottom: '250px'}}>
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
                  name="short_name"
                  value={short_name}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomSelect
                  textFieldProps={{
                    label: "Country/Location",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  options={countries}
                  handleChange={(data) => this.handleSelectCountry(data)}
                  selectedValue={selected_country}
                />
              </Grid>
              <Grid item sm={6} xs={12}>
                <CustomSelect
                  textFieldProps={{
                    label: "Type",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  options={typeList}
                  handleChange={(data) => this.handleSelectType(data)}
                  selectedValue={selected_type}
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

export default LocationEditorDialog;
