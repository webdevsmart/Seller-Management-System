import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getPartsTypeById, updatePartsType, addNewPartsType } from "./PartsTypeService";
import { generateRandomId } from "utils";

class PartsTypeEditorDialog extends Component {
  state = {
    name: "",
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
      updatePartsType({
        ...this.state
      }).then(() => {
        this.setState({_id: null});
        this.props.handleClose();
      });
    } else {
      const newPartsType = {
          ID: 'PT' + generateRandomId(),
          name: this.state.name,
      }
      addNewPartsType(newPartsType).then((res) => {
        this.props.handleClose();
      });
    }
  };

  componentWillMount() {
    if (this.props.mid)
        getPartsTypeById(this.props.mid).then(data => this.setState({ ...data.data }));
    else {
        this.setState({
            type: "",
            value: "",
        });
    }
  }

  render() {
    let { name } = this.state;
    let { open, handleClose } = this.props;

    return (
      <Dialog onClose={handleClose} open={open} maxWidth={'md'} fullWidth={true}>
        <div className="p-24">
          <h4 className="mb-20">Update Parts Type</h4>
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
