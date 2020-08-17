import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getVariationById, updateVariation, addNewVariation } from "./VariationService";
import { generateRandomId } from "utils";

class CategoryEditorDialog extends Component {
  state = {
    type: "",
    value: "",
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
      updateVariation({
        ...this.state
      }).then(() => {
        this.props.handleClose();
      });
    } else {
      const newVariaition = {
          type: this.state.type,
          value: this.state.value,
          uid: 'PV' + generateRandomId()
      }
      addNewVariation(newVariaition).then((res) => {
        this.props.handleClose();
      });
    }
  };

  componentWillMount() {
    if (this.props.mid)
        getVariationById(this.props.mid).then(data => this.setState({ ...data.data }));
    else {
        this.setState({
            type: "",
            value: "",
        });
    }
  }

  render() {
    let { type, value } = this.state;
    let { open, handleClose } = this.props;

    return (
      <Dialog onClose={handleClose} open={open}>
        <div className="p-24">
          <h4 className="mb-20">Update Variation</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={4}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label="Type"
                  onChange={this.handleChange}
                  type="text"
                  name="type"
                  value={type}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />

              </Grid>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label="Value"
                  onChange={this.handleChange}
                  type="text"
                  name="value"
                  value={value}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
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

export default CategoryEditorDialog;
