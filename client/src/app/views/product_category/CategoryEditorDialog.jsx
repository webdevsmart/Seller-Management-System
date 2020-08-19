import React, { Component } from "react";
import {
  Dialog,
  Button,
  Grid,
  FormControlLabel,
  Switch
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { getCategoryById, updateCategory, addNewCategory } from "./CategoryService";
import { generateRandomId } from "utils";

class CategoryEditorDialog extends Component {
  state = {
    ID: "",
    category: "",
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
      updateCategory({
        ...this.state
      }).then(() => {
        this.props.handleClose();
      });
    } else {
      const newCat = {
          ID: 'CAT' + generateRandomId(),
          category: this.state.category,
      }
      addNewCategory(newCat).then((res) => {
        this.props.handleClose();
      });
    }
  };

  componentWillMount() {
    if (this.props.mid)
        getCategoryById(this.props.mid).then(data => this.setState({ ...data.data }));
    else {
        this.setState({
            ID: "",
            category: "",
        });
    }
  }

  render() {
    let { category } = this.state;
    let { open, handleClose } = this.props;

    return (
      <Dialog onClose={handleClose} open={open} fullWidth={true} maxWidth="lg" scroll={'paper'}>
        <div className="p-24">
          <h4 className="mb-20">Update Category</h4>
          <ValidatorForm ref="form" onSubmit={this.handleFormSubmit}>
            <Grid className="mb-16" container spacing={4}>
              <Grid item sm={12} xs={12}>
                <TextValidator
                  className="w-100 mb-16"
                  label="Category"
                  onChange={this.handleChange}
                  type="text"
                  name="category"
                  value={category}
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
