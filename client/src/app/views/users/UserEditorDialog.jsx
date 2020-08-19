import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
  Switch
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getUserById, updateUser, addNewUser } from "./UserService";
import Checkbox from "@material-ui/core/Checkbox";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import { generateRandomId } from "utils";

class UserEditorDialog extends Component {
  state = {
    email: "",
    role: "",
    name: "",
    password: "",
    role: "ADMIN",
    permissions: {
      product: false,
      product_cost: false,
      product_category: false,
      supplier: false,
      parts: false,
      product_variation: false,
      parts_um: false,
      parts_type: false,
      supplier_type: false,
      freight: false,
      storage: false,
      fullfillment: false,
      misc: false,
      users: false,
    },
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
      let {permissions} = this.state;
      let user_permissions = [];
      for (const key in permissions) {
        if (permissions[key] == true) {
          user_permissions.push(key);
        }
      }
      const newUser = {
          _id: _id,
          email: this.state.email,
          password: this.state.password,
          role: this.state.role,
          name: this.state.name,
      }
      if (this.state.role != "ADMIN")
        newUser.permissions = user_permissions;
      updateUser(newUser).then(() => {
        this.props.handleClose();
      });
    } else {
      let {permissions} = this.state;
      let user_permissions = [];
      for (const key in permissions) {
        if (permissions[key] == true) {
          user_permissions.push(key);
        }
      }
      const newUser = {
          email: this.state.email,
          password: this.state.password,
          role: this.state.role,
          name: this.state.name,
      }
      if (this.state.role != "ADMIN")
        newUser.permissions = user_permissions;
      addNewUser(newUser).then((res) => {
        this.props.handleClose();
      });
    }
  };

  componentWillMount() {
    if (this.props.mid)
        getUserById(this.props.mid).then((data) => {
          let {permissions} = this.state;
          for (const key in permissions) {
            if (data.data.permissions.includes(key))
              permissions[key] = true;
          }
          let curUser = {
            email: data.data.email,
            name: data.data.name,
            role: data.data.role,
            password: "",
            permissions: permissions,
            _id: data.data._id,
          }
          this.setState({...curUser});
        });
    else {
        this.setState({
            email: "",
            name: "",
            password: "",
        });
    }
  }

  handleCheckChange = (e) => {
    let {permissions} = this.state;
    permissions[e.target.value] = e.target.checked;
    this.setState({permissions});
  }

  render() {
    let { email, name, password, role } = this.state;
    let { open, handleClose } = this.props;

    return (
      <Dialog onClose={handleClose} open={open} maxWidth={'md'} fullWidth={true}>
        <div className="p-24">
          <h4 className="mb-20">Update User</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={4}>
              <Grid item sm={12} xs={12}>
                <RadioGroup
                  value={role}
                  name="role"
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel
                    value="ADMIN"
                    control={<Radio color="secondary" />}
                    label="Admin"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="SA"
                    control={<Radio color="secondary" />}
                    label="User"
                    labelPlacement="end"
                  />
                </RadioGroup>
              </Grid>
              {
                role === "SA" && (
                  <Grid item sm={12} xs={12}>
                    <h5>
                      Permissions:
                    </h5>
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.product}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="product"
                        />
                      }
                      label="Product"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.product_cost}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="product_cost"
                        />
                      }
                      label="Product Cost"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.product_category}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="product_category"
                        />
                      }
                      label="Product Category"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.supplier}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="supplier"
                        />
                      }
                      label="Supplier"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.parts}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="parts"
                        />
                      }
                      label="Parts"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.product_variation}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="product_variation"
                        />
                      }
                      label="Product Variation"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.parts_um}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="parts_um"
                        />
                      }
                      label="Parts UM"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.parts_type}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="parts_type"
                        />
                      }
                      label="Parts Type"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.supplier_type}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="supplier_type"
                        />
                      }
                      label="Supplier Type"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.freight}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="freight"
                        />
                      }
                      label="Freight"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.storage}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="storage"
                        />
                      }
                      label="Storage"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.fullfillment}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="fullfillment"
                        />
                      }
                      label="Fullfillment"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.misc}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="misc"
                        />
                      }
                      label="Misc"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={this.handleCheckChange}
                          checked={this.state.permissions.users}
                          icon={<FavoriteBorder />}
                          checkedIcon={<Favorite />}
                          value="users"
                        />
                      }
                      label="Users"
                    />
                  </Grid>
                )
              }
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
