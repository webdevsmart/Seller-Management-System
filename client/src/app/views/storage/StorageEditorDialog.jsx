import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getStorageById, updateStorage, addNewStorage } from "./StorageService";
import CustomSelect from "./CustomSelect";
import { getAllPartsUM } from "../parts_um/PartsUMService";
import { generateRandomId } from "utils";
import NumberFormat from "react-number-format";

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

class StorageEditorDialog extends Component {
  state = {
    _id: null,
    name: "",
    rate: "",
    UM: "",
    partsUMList: [],
    selectedUM: null,
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
      const newStorage = {
          _id: this.state._id,
          name: this.state.name,
          rate: this.state.rate,
          UM: this.state.selectedUM.value
      };
      updateStorage(newStorage).then(() => {
        this.props.handleClose();
      });
    } else {
      const newStorage = {
          ID: 'S' + generateRandomId(),
          name: this.state.name,
          rate: this.state.rate,
          UM: this.state.selectedUM.value
      }
      addNewStorage(newStorage).then((res) => {
        this.props.handleClose();
      });
    }
  };

  componentDidMount() {
    getAllPartsUM().then((res) => {
      this.setState({ partsUMList: res.data.map(item => ({value: item._id, label: item.short_name})) });
    });
  }

  componentWillMount() {
    if (this.props.mid)
        getStorageById(this.props.mid).then((res) => {
          const curStorage = {
            _id: res.data._id,
            rate: res.data.rate,
            selectedUM: {label: res.data.UM.short_name, value: res.data.UM._id},
            name: res.data.name,
          };
          this.setState({ ...curStorage });
        });
    else {
        this.setState({
          _id: null,
          name: "",
          rate: "",
          selectedUM: "",
        });
    }
  }

  render() {
    let { name, rate, selectedUM, partsUMList } = this.state;
    let { open, handleClose } = this.props;

    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="p-24">
          <h4 className="mb-20">Update Storage</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={4}>
              <Grid item sm={12} xs={12}>
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
              <Grid item sm={12} xs={12}>
                <TextField
                  value={rate}
                  className="w-100 mb-16"
                  onChange={(event) => this.setState({rate: event.target.value})}
                  name="rate"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                />
              </Grid>
              <Grid item sm={12} xs={12}>
                <CustomSelect
                  textFieldProps={{
                    label: "Parts UM",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  handleChange={(data) => this.setState({selectedUM: data})}
                  options={partsUMList}
                  selectedValue={selectedUM}
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

export default StorageEditorDialog;
