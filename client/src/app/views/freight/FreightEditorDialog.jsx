import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  TextField,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getFreightById, updateFreight, addNewFreight } from "./FreightService";
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

class FreightEditorDialog extends Component {
  state = {
    _id: null,
    name: "",
    costUSD: "",
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
      const newFreight = {
          _id: this.state._id,
          name: this.state.name,
          cost_usd: this.state.costUSD,
          UM: this.state.selectedUM.value
      };
      updateFreight(newFreight).then(() => {
        this.props.handleClose();
      });
    } else {
      const newFreight = {
          ID: 'F' + generateRandomId(),
          name: this.state.name,
          cost_usd: this.state.costUSD,
          UM: this.state.selectedUM.value
      }
      addNewFreight(newFreight).then((res) => {
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
        getFreightById(this.props.mid).then((res) => {
          const curFreight = {
            _id: res.data._id,
            costUSD: res.data.cost_usd,
            selectedUM: {label: res.data.UM.short_name, value: res.data.UM._id},
            name: res.data.name,
          };
          this.setState({ ...curFreight });
        });
    else {
        this.setState({
          _id: null,
          name: "",
          costUSD: "",
          selectedUM: "",
        });
    }
  }

  render() {
    let { name, costUSD, selectedUM, partsUMList } = this.state;
    let { open, handleClose } = this.props;

    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="p-24">
          <h4 className="mb-20">Update Freight</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid container spacing={4} style={{marginBottom: '250px'}}>
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
                  value={costUSD}
                  label="Cost USD"
                  className="w-100 mb-16"
                  onChange={(event) => this.setState({costUSD: event.target.value})}
                  name="costUSD"
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

export default FreightEditorDialog;
