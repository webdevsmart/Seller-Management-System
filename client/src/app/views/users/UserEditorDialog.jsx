import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getUserById, updateUser, addNewUser } from "./UserService";
import { generateRandomId } from "utils";

class UserEditorDialog extends Component {
  state = {
    email: "",
    role: "",
    name: "",
    password: "",
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
      updateUser({
        ...this.state
      }).then(() => {
        this.props.handleClose();
      });
    } else {
      const newUser = {
          email: this.state.email,
          password: this.state.password,
          role: 'SA',
          name: this.state.name,
      }
      addNewUser(newUser).then((res) => {
        this.props.handleClose();
      });
    }
  };

  componentWillMount() {
    if (this.props.mid)
        getUserById(this.props.mid).then(data => this.setState({ ...data.data, password: "" }));
    else {
        this.setState({
            email: "",
            name: "",
            password: "",
        });
    }
  }

  render() {
    let { email, name, password } = this.state;
    let { open, handleClose } = this.props;

    return (
      <Dialog onClose={handleClose} open={open} maxWidth={'md'} fullWidth={true}>
        <div className="p-24">
          <h4 className="mb-20">Update User</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={4}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-24"
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
                <TextValidator
                    className="mb-24 w-100"
                    label="Email"
                    onChange={this.handleChange}
                    type="email"
                    name="email"
                    value={email}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                    "this field is required",
                    "email is not valid"
                    ]}
                />
            </Grid>
            <Grid item sm={12} xs={12}>
                <TextValidator
                    className="mb-16 w-100"
                    label="Password"
                    onChange={this.handleChange}
                    name="password"
                    type="password"
                    value={password}
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

export default UserEditorDialog;
