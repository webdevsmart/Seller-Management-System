import React, { Component } from "react";
import {
  Button,
  Icon,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  IconButton,
  Fab,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Select from "react-select";
import { Breadcrumb, SimpleCard } from "egret";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import CustomSelect from "./CustomSelect";
import { addNewSupplier, getAllSuppliers } from "./SupplierService";
import { getAllSupplierTypes } from "../supplier_type/SupplierTypeService";
import { getAllPartsUM } from "../parts_um/PartsUMService";
import { getAllPartsType, addNewPartsType } from "../parts_type/PartsTypeService";
import { addNewParts } from "../parts/PartsService";
import { generateRandomId } from "utils";
import NumberFormat from "react-number-format";

const countries = [
  { label: "Afghanistan" },
  { label: "Aland Islands" },
  { label: "Albania" },
  { label: "Algeria" },
  { label: "American Samoa" },
  { label: "Andorra" },
  { label: "Angola" },
  { label: "Anguilla" },
  { label: "Antarctica" },
  { label: "Antigua and Barbuda" },
  { label: "Argentina" },
  { label: "Armenia" },
  { label: "Aruba" },
  { label: "Australia" },
  { label: "Austria" },
  { label: "Azerbaijan" },
  { label: "Bahamas" },
  { label: "Bahrain" },
  { label: "Bangladesh" },
  { label: "Barbados" },
  { label: "Belarus" },
  { label: "Belgium" },
  { label: "Belize" },
  { label: "Benin" },
  { label: "Bermuda" },
  { label: "Bhutan" },
  { label: "Bolivia, Plurinational State of" },
  { label: "Bonaire, Sint Eustatius and Saba" },
  { label: "Bosnia and Herzegovina" },
  { label: "Botswana" },
  { label: "Bouvet Island" },
  { label: "Brazil" },
  { label: "British Indian Ocean Territory" },
  { label: "Brunei Darussalam" }
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label
}));

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

class AddNewSupplier extends Component {
  state = {
    ID: 'S' + generateRandomId(),
    start_date: new Date(),
    type: "",
    country: "",
    name: "",
    contact: "",
    skype: "",
    wechat: "",
    whatsapp: "",
    mobile: "",
    office: "",
    email: "",
    main_products_services: "",
    address: "",
    notess: "",
    loading: false,
    supplierTypeList: [],
    partsUMList: [],
    partsTypeList: [],
    supplierList: [],
    parts: [],
  };

  componentDidMount() {
    getAllSupplierTypes().then((res) => {
      let types = res.data.map(item => ({
        value: item._id,
        label: item.name,
      }));
      this.setState({ supplierTypeList: types });
    });
    getAllPartsType().then((res) => {
      this.setState({ partsTypeList: res.data.map(item => ({value: item._id, label: item.name})) });
    });
    getAllPartsUM().then((res) => {
      this.setState({ partsUMList: res.data.map(item => ({value: item._id, label: item.short_name})) });
    });
    getAllSuppliers().then((res) => {
      this.setState({ supplierList: res.data.map(item => ({value: item._id, label: item.name, ID: item.ID})) });
    })
  }

  handleSubmit = (event) => {
    addNewSupplier(this.state).then((res) => {
      if (this.state.parts.length != 0) {
        let {parts} = this.state;
        let newParts = parts.map((part) => {
          return {
            ID: part.IDCode,
            name: part.name,
            type: part.selectedType.value,
            cost_usd: part.UPrice,
            UM: part.selectedUM.value,
            qty: part.qty,
            supplier_id: res.data._id,
          }
        });
        addNewParts(newParts).then((res1) => {
          this.props.history.push('/supplier/list');
        });
      }
    });
  };

  handleChange = (event, source) => {
    event.persist();
    this.setState({
    [event.target.name]: event.target.value
    });
  };

  addNewPart = () => {
    let newPart = {
      IDCode: 'P' + generateRandomId(),
      name: "",
      selectedType: "",
      selectedUM: "",
      UPrice: 0,
      qty: 0,
    }
    let {parts} = this.state;
    parts.push(newPart);
    this.setState({parts});
  }

  handleSelectPartsType = (data, index) => {
    let {parts} = this.state;
    parts[index].selectedType = data;
    this.setState({parts});
  }

  handleSelectPartsUM = (data, index) => {
    let {parts} = this.state;
    parts[index].selectedUM = data;
    this.setState({parts});
  }

  handleChangePartsQty = (e, index) => {
    let { parts } = this.state;
    parts[index].qty = e.target.value;
    this.setState({parts});
  }

  handleChangeUPrice = (e, index) => {
    let { parts } = this.state;
    parts[index].UPrice = e.target.value;
    this.setState({parts});
  }

  handleChangePartName = (e, index) => {
    let { parts } = this.state;
    parts[index].name = e.target.value;
    this.setState({parts});
  }
  

  render() {
    let { 
      ID,
      start_date,
      type,
      country,
      name,
      contact,
      skype,
      wechat,
      whatsapp,
      mobile,
      office,
      email,
      main_products_services,
      address,
      notes,
      loading,
      supplierTypeList,
      partsTypeList,
      partsUMList,
      supplierList,
      parts } = this.state;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Add New Supplier" }]} />
        </div>
        <SimpleCard>
          <ValidatorForm
            ref="form"
            onSubmit={this.handleSubmit}
            onError={(errors) => null}
          >
            <div className="viewer_actions px-16 flex flex-end">
              <div className="mb-24">
                <Button
                  type="submit"
                  className="py-8"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                >
                  Save
                </Button>
              </div>
            </div>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label="ID"
                  readOnly
                  // onChange={this.handleChange}
                  type="text"
                  name="ID"
                  value={ID}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className="mb-16 w-100"
                    margin="none"
                    id="mui-pickers-date"
                    label="Start Date"
                    inputVariant="standard"
                    type="text"
                    autoOk={true}
                    value={start_date}
                    onChange={(date) => this.setState({start_date: date})}
                    KeyboardButtonProps={{
                      "aria-label": "change date"
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomSelect
                  textFieldProps={{
                    label: "Supplier Type",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  handleChange={(data) => this.setState({type: data.value})}
                  options={supplierTypeList}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomSelect
                  textFieldProps={{
                    label: "Country",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  handleChange={(data) => this.setState({country: data.value})}
                  options={countries}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label="Name"
                  onChange={this.handleChange}
                  type="text"
                  name="name"
                  value={name}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="Contact"
                  onChange={this.handleChange}
                  type="text"
                  name="contact"
                  value={contact}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="Mobile"
                  onChange={this.handleChange}
                  type="text"
                  name="mobile"
                  value={mobile}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="Office"
                  onChange={this.handleChange}
                  type="text"
                  name="office"
                  value={office}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="Email"
                  onChange={this.handleChange}
                  type="email"
                  name="email"
                  value={email}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <h5 className="text-primary">CHAT</h5>
                <TextValidator
                  className="mb-16 w-100"
                  label="Skype"
                  onChange={this.handleChange}
                  type="text"
                  name="skype"
                  value={skype}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="WeChat"
                  onChange={this.handleChange}
                  type="text"
                  name="wechat"
                  value={wechat}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="WhatsApp"
                  onChange={this.handleChange}
                  type="text"
                  name="whatsapp"
                  value={whatsapp}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextValidator
                  className="mb-16 w-100"
                  label="Main Products/Services"
                  onChange={this.handleChange}
                  type="text"
                  name="main_products_services"
                  value={main_products_services}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                    label="Address"
                    fullWidth
                    multiline={true}
                    rows={5}
                    name="address"
                    value={address}
                    onChange={this.handleChange}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                    label="Notes"
                    fullWidth
                    multiline={true}
                    rows={5}
                    name="notes"
                    value={notes}
                    onChange={this.handleChange}
                />
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12} style={{minHeight: '500px'}}>
                <div className="w-100 overflow-auto" style={{paddingBottom: '300px'}}>
                  <Table style={{border: '1px solid rgba(224, 224, 224, 1)', whiteSpace: "pre"}}>
                    <colgroup>
                      <col style={{width:'100px'}}/>
                      <col style={{width:'300px'}}/>
                      <col style={{width:'150px'}}/>
                      <col style={{width:'150px'}}/>
                      <col style={{width:'100px'}}/>
                      <col style={{width:'100px'}}/>
                      <col style={{width:'100px'}}/>
                    </colgroup>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={1} align='center' className="bg-light-green">
                              <Fab color="primary" aria-label="Add" onClick={this.addNewPart}>
                                <Icon>add</Icon>
                              </Fab>
                            </TableCell>
                            <TableCell colSpan={6} align='center' className="bg-light-green">
                                PARTS
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">ID Code</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Type</TableCell>
                            <TableCell align="center">UM</TableCell>
                            <TableCell align="center">UPrice</TableCell>
                            <TableCell align="center">Qty</TableCell>
                            <TableCell align="center">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                        parts && parts.map((part, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell className="px-10" align="center">
                                  <TextValidator
                                      type="text"
                                      value={part.IDCode}
                                      readOnly
                                      inputProps={{min: 0, style: { textAlign: 'center' }}}
                                  />
                              </TableCell>
                              <TableCell align='center' className="pr-10">
                                <TextField name="name" value={part.name} onChange={(e) => this.handleChangePartName(e, index)} fullWidth={true} />
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                <CustomSelect
                                  textFieldProps={{
                                    InputLabelProps: {
                                      htmlFor: "react-select-single",
                                      shrink: true,
                                    },
                                    placeholder: "",
                                  }}
                                  
                                  handleChange={(data) => this.handleSelectPartsType(data, index)}
                                  selectedValue={part.selectedType}
                                  options={partsTypeList}
                                />
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                <CustomSelect
                                  textFieldProps={{
                                    InputLabelProps: {
                                      htmlFor: "react-select-single",
                                      shrink: true,
                                    },
                                    placeholder: "",
                                  }}
                                  handleChange={(data) => this.handleSelectPartsUM(data, index)}
                                  selectedValue={part.selectedUM}
                                  options={partsUMList}
                                />
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                  <TextField
                                    value={part.UPrice}
                                    onChange={(e) => this.handleChangeUPrice(e, index)}
                                    name="UPrice"
                                    InputProps={{
                                      inputComponent: NumberFormatCustom,
                                      
                                    }}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                  />
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                  <TextValidator
                                      onChange={(e) => this.handleChangePartsQty(e, index)}
                                      type="text"
                                      name="qty"
                                      value={part.qty}
                                      inputProps={{min: 0, style: { textAlign: 'center' }}}
                                  />
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                  $ {parseFloat(part.UPrice * part.qty).toFixed(2)}
                              </TableCell>
                          </TableRow>
                          )
                          
                        })
                      }
                        
                    </TableBody>
                  </Table>
                </div>
              </Grid>
            </Grid>
          </ValidatorForm>
        </SimpleCard>
      </div>
    );
  }
}

export default AddNewSupplier;
