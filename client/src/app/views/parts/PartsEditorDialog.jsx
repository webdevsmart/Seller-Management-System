import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  TextField
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getPartsById, updateParts } from "./PartsService";
import { getAllPartsType } from "../parts_type/PartsTypeService";
import { getAllPartsUM } from "../parts_um/PartsUMService";
import CustomSelect from "./CustomSelect";
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

class PartsTypeEditorDialog extends Component {
  state = {
    _id: null,
    name: "",
    selectedType: null,
    selectedUM: null,
    costUSD: 0,
    qty: 0,
    partsTypeList: [],
    partsUMList: [],
  };

  handleChange = (event, source) => {
    event.persist();
    this.setState({
    [event.target.name]: event.target.value
    });
  };

  handleFormSubmit = () => {
    let newParts = {
      _id: this.state._id,
      name: this.state.name,
      type: this.state.selectedType.value,
      costUSD: this.state.costUSD,
      UM: this.state.selectedUM.value,
      qty: this.state.qty,
    };
    updateParts(newParts).then(() => {
      this.props.handleClose();
    });
  };

  componentWillMount() {
    
    getAllPartsType().then((res) => {
      this.setState({ partsTypeList: res.data.map(item => ({value: item._id, label: item.name})) });
    });
    getAllPartsUM().then((res) => {
      this.setState({ partsUMList: res.data.map(item => ({value: item._id, label: item.short_name})) });
    });

    getPartsById(this.props.mid).then(res => {
      let data = res.data;
      let curParts = {
        _id: data._id,
        name: data.name,
        selectedUM: {value: data.UM._id, label: data.UM.short_name},
        selectedType: {value: data.type._id, label: data.type.name},
        qty: data.qty,
        costUSD: data.cost_usd,
      }
      this.setState({ ...curParts }, () => {
        console.log(this.state);
      });
    });
  }

  render() {
    let {       
      _id,
      name,
      selectedType,
      selectedUM,
      costUSD,
      qty,
      partsTypeList,
      partsUMList,
    } = this.state;
    let { open, handleClose } = this.props;

    return (
      <Dialog onClose={handleClose} open={open} maxWidth={'md'} fullWidth={true}>
        <div className="p-24">
          <h4 className="mb-20">Update Parts</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-48" container spacing={4}>
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
              <Grid item sm={3} xs={6}>
                <CustomSelect
                  textFieldProps={{
                    label: "Parts Type",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  
                  handleChange={(data) => this.setState(prevState => ({
                      ...prevState.parts,
                      selectedType: data
                  }))}
                  selectedValue={selectedType}
                  options={partsTypeList}
                />
              </Grid>
              <Grid item sm={3} xs={6}>
                <CustomSelect
                  textFieldProps={{
                    label: "Parts UM",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  
                  handleChange={(data) => this.setState(prevState => ({
                      ...prevState.parts,
                      selectedUM: data
                  }))}
                  selectedValue={selectedUM}
                  options={partsUMList}
                />
              </Grid>
              <Grid item sm={3} xs={6}>
                <TextField
                  className="w-100"
                  label="Cost USD"
                  value={costUSD}
                  onChange={(e) => this.setState(prevState => ({
                    costUSD: e.target.value
                  }))}
                  name="costUSD"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                    
                  }}
                  inputProps={{min: 0, style: { textAlign: 'center' }}}
                />
              </Grid>
              <Grid item sm={3} xs={6}>
                <TextValidator
                  className="w-100 mb-16"
                  label="Quantity"
                  onChange={this.handleChange}
                  type="text"
                  name="qty"
                  value={qty}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  inputProps={{min: 0, style: { textAlign: 'center' }}}
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

export default PartsTypeEditorDialog;
