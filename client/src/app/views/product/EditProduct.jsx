import React, { Component } from "react";
import {
  Fab,
  Button,
  Icon,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Breadcrumb, SimpleCard } from "egret";
import CustomSelect from "./CustomSelect";
import { getAllCategories } from "../product_category/CategoryService";
import { getAllVariationType, getAllVariationValue } from "../product_variation/VariationService";
import { getAllFreight } from "../freight/FreightService";
import { getAllParts } from "../parts/PartsService";
import { addNewProduct,getProductById, updateProduct } from "./ProductService"
import NumberFormat from "react-number-format";
import { generateRandomId } from "utils";
import { getAllStorage } from "../storage/StorageService";
import { getAllFullfillment } from "../fullfillment/FullfillmentService";

function NumberFormatPrefixCustom(props) {
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

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      style={{textAlign: 'center'}}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        });
      }}
      thousandSeparator
    />
  );
}

class EditProduct extends Component {
  state = {
    product_image: null,
    image_file: null,
    name: "",
    SKU: "",
    UPC: "",
    ASIN: "",
    selectedParentCategory: "",
    selectedCategoryList: [],
    retailPrice: 0,
    selectedFFAmazon: null,
    selectedFFThirdParty: null,
    selectedFFUs: null,
    productWidth: 0,
    productHeight: 0,
    productDepth: 0,
    productGrams: 0,
    packagedWidth: 0,
    packagedHeight: 0,
    packagedDepth: 0,
    packagedGrams: 0,
    selectedFreight: null,
    selectedParts: [],
    partsIDCode: [],
    notes: "",
    selectedStorage: null,
    fullfillmentType: "Amazon",
    storageDuration: 0,
    freightQty: 0,

    selectedVariationType: "",
    selectedVariationValue: "",
    variationTypeList: [],
    variationValueList: [],
    categoryList: [],
    freightList: [],
    partsList: [],
    storageList: [],
    fullfillmentList: [],
  };

  componentDidMount() {
    getAllCategories().then((res) => {
      let items = res.data.map(item => ({
        value: item._id,
        label: item.category,
      }));
      this.setState({ categoryList: items });
    });
    getAllVariationType().then((res) => {
      this.setState({ variationTypeList: res.data.map(item => ({value: item._id, label: item._id})) });
    });
    getAllFreight().then((res) => {
      this.setState({ freightList: res.data.map(item => ({ ...item, value: item._id, label: item.name, UM: item.UM.short_name})) });
    });
    getAllParts().then((res) => {
      this.setState({ partsList: res.data.map(item => ({ ...item, value: item._id, label: item.name })) }, () => {
      });
    });
    getAllStorage().then((res) => {
      this.setState({ storageList: res.data.map(item => ({ ...item, value: item._id, label: item.name, UM: item.UM.short_name })) });
    });
    getAllFullfillment().then((res) => {
      this.setState({ fullfillmentList: res.data.map(item => ({ ...item, value: item._id, label: item.name })) });
    });

    getProductById(this.props.match.params.id).then((res) => {
      console.log(res.data.parts);
      let curProduct = {
        product_image: '/' + res.data.img,
        name: res.data.name,
        SKU: res.data.sku,
        UPC: res.data.upc,
        ASIN: res.data.asin,
        selectedVariationType: { value: res.data.variation_type, label: res.data.variation_type },
        selectedVariationValue: { value: res.data.variation_value, label: res.data.variation_value },
        selectedParentCategory: { ...res.data.parent_category, value: res.data.parent_category._id, label: res.data.parent_category.category },
        selectedCategoryList: res.data.categories.map((cat) => {
          return {...cat, label: cat.category, value: cat._id}
        }),
        retailPrice: res.data.retail_price,
        selectedFFAmazon: { ...res.data.fullfillment_amazon, label: res.data.fullfillment_amazon.name, value: res.data.fullfillment_amazon._id },
        selectedFFThirdParty: { ...res.data.fullfillment_thirdparty, label: res.data.fullfillment_amazon.name, value: res.data.fullfillment_amazon._id },
        selectedFFUs: { ...res.data.fullfillment_us, label: res.data.fullfillment_amazon.name, value: res.data.fullfillment_amazon._id },
        productWidth: res.data.product_width,
        productHeight: res.data.product_height,
        productDepth: res.data.product_depth,
        productGrams: res.data.product_grams,
        packagedWidth: res.data.packaged_width,
        packagedHeight: res.data.packaged_height,
        packagedDepth: res.data.packaged_depth,
        packagedGrams: res.data.packaged_grams,
        selectedFreight: { cost_usd: res.data.freight.cost_usd, UM: res.data.freight.UM.short_name, value: res.data.freight._id, label: res.data.freight.name },
        freightQty: res.data.freight_qty,
        selectedStorage: { rate: res.data.storage.rate, UM: res.data.storage.UM.short_name, value: res.data.storage._id, label: res.data.storage.name },
        storageDuration: res.data.storage_duration,
        notes: res.data.notes,
        selectedParts: res.data.parts.map((part) => {
          return {...part, label: part.name, value: part._id}
        }),
        partsIDCode: res.data.parts.map((part) => {
          return part.ID
        }),
        fullfillmentType: res.data.fullfillment_type
      }
      console.log(curProduct.selectedParts);
      this.setState({ ...curProduct });
    });
  }

  handleSubmit = (event) => {
    let fulfillmentFBAFee = this.state.selectedFFAmazon.value;
    if (this.state.fullfillmentType == 'ThirdPary')
      fulfillmentFBAFee = this.state.selectedFFThirdParty.value;
    else if (this.state.fullfillmentType == 'US')
      fulfillmentFBAFee = this.state.selectedFFUs.value;
    let parts = [];
    this.state.selectedParts.map((part) => {
      if (part && part.value)
        parts.push(part.value);
    });
    const newProduct = {
      name: this.state.name,
      sku: this.state.SKU,
      upc: this.state.UPC,
      asin: this.state.ASIN,
      variation_type: this.state.selectedVariationType.value,
      variation_value: this.state.selectedVariationValue.value,
      parent_category: this.state.selectedParentCategory.value,
      categories: this.state.selectedCategoryList.map(a => a.value),
      retail_price: parseFloat(this.state.retailPrice).toFixed(2),
      fullfillment_amazon: this.state.selectedFFAmazon.value,
      fullfillment_thirdparty: this.state.selectedFFThirdParty.value,
      fullfillment_us: this.state.selectedFFUs.value,
      product_width: this.state.productWidth,
      product_height: this.state.productHeight,
      product_depth: this.state.productDepth,
      product_grams: this.state.productGrams,
      packaged_width: this.state.packagedWidth,
      packaged_height: this.state.packagedHeight,
      packaged_depth: this.state.packagedDepth,
      packaged_grams: this.state.packagedGrams,
      freight: this.state.selectedFreight.value,
      freight_qty: this.state.freightQty,
      storage: this.state.selectedStorage.value,
      storage_duration: this.state.storageDuration,
      notes: this.state.notes,
      parts: parts,
      fullfillment_fba_fee: fulfillmentFBAFee,
      fullfillment_type: this.state.fullfillmentType,
    };
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const formData = new FormData();
    formData.append('is_new_image', this.state.image_file ? true : false);
    formData.append('file', this.state.image_file);
    formData.append('_id', this.props.match.params.id);
    formData.append('new_product', JSON.stringify(newProduct));
    updateProduct(formData, config).then((res) => {
      this.props.history.push('/product/list');
    }).catch((err) => {

    });
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
    [event.target.name]: event.target.value
    });
  }

  handleSelectVType = (data) => {
    this.setState({selectedVariationType: data});
    getAllVariationValue(data.value).then((res) => {
      this.setState({ variationValueList: res.data.map(item => ({value: item._id, label: item._id})) });
    });
  }

  handleSearchParts = (e, index) => {
    e.persist();
    let {partsIDCode, selectedParts} = this.state;
    partsIDCode[index] = e.target.value;
    let obj = this.state.partsList.find(o => o.ID === e.target.value);
    if (obj)
      selectedParts[index] = obj;
    else
      selectedParts[index] = null;
    this.setState({selectedParts: selectedParts, partsIDCode: partsIDCode});
  }

  handleSelectParts = (data, index) => {
    let {partsIDCode, selectedParts} = this.state;
    console.log(data);
    partsIDCode[index] = data.ID;
    selectedParts[index] = data;
    console.log(partsIDCode, selectedParts);
    this.setState({selectedParts: selectedParts, partsIDCode: partsIDCode});
  }
  
  addNewPart = () => {
    let { selectedParts, partsIDCode } = this.state;
    partsIDCode.push("");
    selectedParts.push(null);
    this.setState({partsIDCode, selectedParts}, () => {
      console.log(this.state);
    });
  }

  handleSelectFreight = (data) => {
    let freightQty = 0;
    if (data.UM == 'CBM')
      freightQty = parseFloat(this.state.productWidth * this.state.productHeight * this.state.productDepth);
    else if (data.UM == 'KG')
      freightQty = parseFloat(this.state.productGrams / 1000);
    else if (data.UM == 'LB')
      freightQty = parseFloat(this.state.productGrams / 1000 * 2.20462);
    else
      freightQty = 0;
    this.setState({freightQty: freightQty, selectedFreight: data});
  }

  handleChangeMetric = (e, name) => {
    this.setState({
      [name]: e.target.value
    }, () => {
      let freightQty = 0;
      if (this.state.selectedFreight) {
        if (this.state.selectedFreight.UM == 'CBM')
          freightQty = parseFloat(this.state.productWidth * this.state.productHeight * this.state.productDepth);
        else if (this.state.selectedFreight.UM == 'KG')
          freightQty = parseFloat(this.state.productGrams / 1000);
        else if (this.state.selectedFreight.UM == 'LB')
          freightQty = parseFloat(this.state.productGrams / 1000 * 2.20462);
        else
          freightQty = 0;
        this.setState({freightQty});
      }
    });
  }

  render() {
    let { 
      name,
      SKU,
      UPC,
      ASIN,
      retailPrice,
      selectedFFAmazon,
      selectedFFUs,
      selectedFFThirdParty,
      variationTypeList,
      selectedVariationType,
      variationValueList,
      selectedVariationValue,
      categoryList,
      selectedParentCategory,
      selectedCategoryList,
      productWidth,
      productHeight,
      productDepth,
      productGrams,
      packagedWidth,
      packagedHeight,
      packagedDepth,
      packagedGrams,
      freightList,
      selectedFreight,
      freightQty,
      partsList,
      selectedParts,
      partsIDCode,
      notes,
      storageList,
      fullfillmentList,
      selectedStorage,
      storageDuration,
      fullfillmentType
    } = this.state;
    let oem = 0;
    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Add New Product" }]} />
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
                >
                  Save
                </Button>
              </div>
            </div>
            <Grid container spacing={6}>
              <Grid item lg={6} md={6} sm={12} xs={12} className="text-center">
                <img className="border-radius-4 mb-16" src={this.state.product_image} width="300"/>
                <div className="">
                <label htmlFor="upload-single-file">
                  <Fab
                    className="capitalize"
                    color="primary"
                    component="span"
                    variant="extended"
                  >
                    <div className="flex flex-middle">
                      <Icon className="pr-8">cloud_upload</Icon>
                      <span>Upload Product Image</span>
                    </div>
                  </Fab>
                </label>
                <input
                  className="display-none"
                  onChange={(e) => this.setState({product_image: URL.createObjectURL(e.target.files[0]), image_file: e.target.files[0]})}
                  id="upload-single-file"
                  type="file"
                />
                </div>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
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
                  label="SKU"
                  onChange={this.handleChange}
                  type="text"
                  name="SKU"
                  value={SKU}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="UPC"
                  onChange={this.handleChange}
                  type="text"
                  name="UPC"
                  value={UPC}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                <TextValidator
                  className="mb-16 w-100"
                  label="ASIN"
                  onChange={this.handleChange}
                  type="text"
                  name="ASIN"
                  value={ASIN}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Table style={{border: '1px solid rgba(224, 224, 224, 1)'}}>
                  <TableHead>
                    <TableRow>
                      <TableCell colSpan={2} align='center' className="bg-light-green">
                          Variation Qualities
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center">Type</TableCell>
                      <TableCell align="center">Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell className="px-10">
                        <CustomSelect
                          textFieldProps={{
                            InputLabelProps: {
                              htmlFor: "react-select-single",
                              shrink: true,
                            },
                            placeholder: "",
                          }}
                          options={variationTypeList}
                          handleChange={this.handleSelectVType}
                          selectedValue={selectedVariationType}
                        />
                      </TableCell>
                      <TableCell className="px-10">
                        <CustomSelect
                          textFieldProps={{
                            InputLabelProps: {
                              htmlFor: "react-select-single",
                              shrink: true,
                            },
                            placeholder: "",
                          }}
                          options={variationValueList}
                          handleChange={(data) => {this.setState({selectedVariationValue: data})}}
                          selectedValue={selectedVariationValue}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomSelect
                  textFieldProps={{
                    label: 'Parent Categroy',
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  options={categoryList}
                  handleChange={(data) => {this.setState({selectedParentCategory: data})}}
                  selectedValue={selectedParentCategory}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <CustomSelect
                  textFieldProps={{
                    label: "Categories",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  options={categoryList}
                  handleChange={(data) => {this.setState({selectedCategoryList: data})}}
                  selectedValue={selectedCategoryList}
                  isMulti={true}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <TextField
                  value={retailPrice}
                  className="w-100 mb-16"
                  onChange={(e) => this.setState({
                      retailPrice: e.target.value
                  })}
                  name="retailPrice"
                  label="Retail Price"
                  InputProps={{
                    inputComponent: NumberFormatPrefixCustom,
                  }}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <RadioGroup
                  className="mb-16"
                  value={fullfillmentType}
                  name="fullfillmentType"
                  onChange={this.handleChange}
                  row
                >
                  <FormControlLabel
                    value="Amazon"
                    control={<Radio color="secondary" />}
                    label="Fullfillment Amazon"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    label="Fullfillment Third Party"
                    control={<Radio color="secondary" />}
                    value="ThirdParty"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    label="Fullfillment By US"
                    control={<Radio color="secondary" />}
                    value="US"
                    labelPlacement="end"
                  />
                </RadioGroup>
                <CustomSelect
                  className="mb-16"
                  textFieldProps={{
                    label: "Fullfillment Amazon",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  options={fullfillmentList}
                  handleChange={(data) => {this.setState({selectedFFAmazon: data})}}
                  selectedValue={selectedFFAmazon}
                />
                <div className="pb-16"></div>
                <CustomSelect
                  className="mb-16"
                  textFieldProps={{
                    label: "Fullfillment By Third Party",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  options={fullfillmentList}
                  handleChange={(data) => {this.setState({selectedFFThirdParty: data})}}
                  selectedValue={selectedFFThirdParty}
                />
                <div className="pb-16"></div>
                <CustomSelect
                  className="mb-16"
                  textFieldProps={{
                    label: "Fullfillment By US",
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  options={fullfillmentList}
                  handleChange={(data) => {this.setState({selectedFFUs: data})}}
                  selectedValue={selectedFFUs}
                />
                <div className="pb-16"></div>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Table style={{border: '1px solid rgba(224, 224, 224, 1)'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4} align='center' className="bg-light-green">
                                METRIC
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align='center' className="bg-default text-green">
                                PRODUCT
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">Width</TableCell>
                            <TableCell align="center">Height</TableCell>
                            <TableCell align="center">Depth</TableCell>
                            <TableCell align="center">CBM</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangeMetric(e, "productWidth")}
                                    InputProps={{
                                      inputComponent: NumberFormatCustom,
                                      min: 0,
                                      style: { textAlign: 'center' }
                                    }}
                                    name="productWidth"
                                    value={productWidth}
                                />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangeMetric(e, "productHeight")}
                                    InputProps={{
                                      inputComponent: NumberFormatCustom,
                                    }}
                                    name="productHeight"
                                    value={productHeight}
                                />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangeMetric(e, "productDepth")}
                                    InputProps={{
                                      inputComponent: NumberFormatCustom,
                                    }}
                                    name="productDepth"
                                    value={productDepth}
                                />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                                {parseFloat(productWidth * productHeight * productDepth).toFixed(2)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} align='center' className='font-weight-500'>
                                Grams
                            </TableCell>
                            <TableCell colSpan={2} align='center' className='font-weight-500'>
                                Kilo
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangeMetric(e, "productGrams")}
                                    InputProps={{
                                      inputComponent: NumberFormatCustom,
                                    }}
                                    name="productGrams"
                                    value={productGrams}
                                />
                            </TableCell>
                            <TableCell colSpan={2} className="px-10" align="center">
                                {parseFloat(productGrams / 1000).toFixed(2)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align='center' className='bg-default text-green font-weight-500'>
                                PACKAGED
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center' className='font-weight-500'>
                                Width
                            </TableCell>
                            <TableCell align='center' className='font-weight-500'>
                                Height
                            </TableCell>
                            <TableCell align='center' className='font-weight-500'>
                                Depth
                            </TableCell>
                            <TableCell align='center' className='font-weight-500'>
                                CBM
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangeMetric(e, "packagedWidth")}
                                    InputProps={{
                                      inputComponent: NumberFormatCustom,
                                    }}
                                    name="packagedWidth"
                                    value={packagedWidth}
                                />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangeMetric(e, "packagedHeight")}
                                    InputProps={{
                                      inputComponent: NumberFormatCustom,
                                    }}
                                    name="packagedHeight"
                                    value={packagedHeight}
                                />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangeMetric(e, "packagedDepth")}
                                    InputProps={{
                                      inputComponent: NumberFormatCustom,
                                    }}
                                    name="packagedDepth"
                                    value={packagedDepth}
                                />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(packagedWidth * packagedHeight * packagedDepth).toFixed(2)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} align='center' className='font-weight-500'>
                                Grams
                            </TableCell>
                            <TableCell colSpan={2} align='center' className='font-weight-500'>
                                Kilo
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangeMetric(e, "packagedGrams")}
                                    InputProps={{
                                      inputComponent: NumberFormatCustom,
                                    }}
                                    name="packagedGrams"
                                    value={packagedGrams}
                                />
                            </TableCell>
                            <TableCell colSpan={2} className="px-10" align="center">
                              {parseFloat(packagedGrams / 1000).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Table style={{border: '1px solid rgba(224, 224, 224, 1)'}}>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={4} align='center' className="bg-light-green">
                                ENGLISH
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align='center' className="bg-default text-green">
                                PRODUCT
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align="center">Width</TableCell>
                            <TableCell align="center">Height</TableCell>
                            <TableCell align="center">Depth</TableCell>
                            <TableCell align="center">CBM</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell className="px-10" align="center">
                              {parseFloat(productWidth * 1.0936).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(productHeight * 1.0936).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(productDepth * 1.0936).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(productWidth * productHeight * productDepth * 1.3080).toFixed(2)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} align='center' className='font-weight-500'>
                                Ounzes
                            </TableCell>
                            <TableCell colSpan={2} align='center' className='font-weight-500'>
                                Pounds
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} className="px-10" align="center">
                              {parseFloat(productGrams * 0.0353).toFixed(2)}
                            </TableCell>
                            <TableCell colSpan={2} className="px-10" align="center">
                              {parseFloat(productGrams / 1000 * 2.20462).toFixed(2)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={4} align='center' className='bg-default text-green font-weight-500'>
                                PACKAGED
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell align='center' className='font-weight-500'>
                                Width
                            </TableCell>
                            <TableCell align='center' className='font-weight-500'>
                                Height
                            </TableCell>
                            <TableCell align='center' className='font-weight-500'>
                                Depth
                            </TableCell>
                            <TableCell align='center' className='font-weight-500'>
                                CBM
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="px-10" align="center">
                              {parseFloat(packagedWidth * 1.0936).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(packagedHeight * 1.0936).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(packagedDepth * 1.0936).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(packagedWidth * packagedHeight * packagedDepth * 1.3080).toFixed(2)}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} align='center' className='font-weight-500'>
                              Ounzes
                            </TableCell>
                            <TableCell colSpan={2} align='center' className='font-weight-500'>
                              Pounds
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2} className="px-10" align="center">
                              {parseFloat(packagedGrams * 0.0353).toFixed(2)}
                            </TableCell>
                            <TableCell colSpan={2} className="px-10" align="center">
                              {parseFloat(packagedGrams / 1000 * 2.20462).toFixed(2)}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <CustomSelect
                  textFieldProps={{
                    label: 'Freight',
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  options={freightList}
                  selectedValue={selectedFreight}
                  handleChange={this.handleSelectFreight}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <TextField 
                  type="text"
                  label='QTY'
                  name="freightQty"
                  value={freightQty}
                  readOnly
                  />
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                {selectedFreight && (
                  <TextField 
                    label='UM'
                    type="text"
                    value={selectedFreight.UM}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                {selectedFreight && (
                  <TextField 
                    label='Cost USD'
                    type="text"
                    value={'$ ' + parseFloat(selectedFreight.cost_usd * freightQty).toFixed(2)}
                    readOnly />
                )}
                
              </Grid>
              
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <CustomSelect
                  textFieldProps={{
                    label: 'Storage',
                    InputLabelProps: {
                      htmlFor: "react-select-single",
                      shrink: true,
                    },
                    placeholder: "",
                  }}
                  options={storageList}
                  selectedValue={selectedStorage}
                  handleChange={(data) => this.setState({selectedStorage: data, storageDuration: 1})}
                />
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <TextField 
                  label='Duration'
                  type="number"
                  name="storageDuration"
                  value={storageDuration}
                  onChange={this.handleChange} />
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                {selectedStorage && (
                  <TextField 
                    label='UM'
                    type="text"
                    value={selectedStorage.UM}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                {selectedStorage && (
                  <TextField 
                    label='Rate'
                    type="text"
                    value={'$ ' + parseFloat(selectedStorage.rate * storageDuration).toFixed(2)}
                    readOnly />
                )}
                
              </Grid>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TextField
                    label="Notes"
                    fullWidth
                    multiline={true}
                    rows={5}
                    name="notes"
                    onChange={this.handleChange}
                    value={notes}
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="w-100 overflow-auto" style={{paddingBottom: '250px'}}>
                  <Table style={{border: '1px solid rgba(224, 224, 224, 1)', whiteSpace: "pre"}}>
                    <colgroup>
                      <col style={{width:'100px'}}/>
                      <col style={{width:'300px'}}/>
                      <col style={{width:'100px'}}/>
                      <col style={{width:'100px'}}/>
                      <col style={{width:'50px'}}/>
                      <col style={{width:'50px'}}/>
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
                            <TableCell colSpan={6} align='right'>
                              OEM:
                            </TableCell>
                            <TableCell colSpan={1}>
                              {
                                selectedParts.map((part) => {
                                  if (part && part.cost_usd && part.qty)
                                    oem += parseFloat(part.cost_usd) * parseFloat(part.qty);
                                })
                              }
                              $ {oem}
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
                        partsIDCode && partsIDCode.map((idCode, index) => {
                          return (
                            <TableRow key={index}>
                              <TableCell className="px-10" align="center">
                                <TextValidator
                                    onChange={(e) => this.handleSearchParts(e, index)}
                                    type="text"
                                    readOnly
                                    value={idCode}
                                    inputProps={{min: 0, style: { textAlign: 'center' }}}
                                />
                              </TableCell>
                              <TableCell align='center' className="pr-10">
                                <CustomSelect
                                  textFieldProps={{
                                    InputLabelProps: {
                                      htmlFor: "react-select-single",
                                      shrink: true,
                                    },
                                    placeholder: "",
                                  }}
                                  handleChange={(data) => this.handleSelectParts(data, index)}
                                  selectedValue={selectedParts[index] && selectedParts[index]}
                                  options={partsList}
                                />
                              </TableCell>
                            <TableCell className="px-10" align="center">
                              {selectedParts[index] && selectedParts[index].type.name}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {selectedParts[index] && selectedParts[index].UM.short_name}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              $ {selectedParts[index] && selectedParts[index].cost_usd}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {selectedParts[index] && selectedParts[index].qty}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              $ {selectedParts[index] && parseFloat(selectedParts[index].qty * selectedParts[index].cost_usd).toFixed(2)}
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

export default EditProduct;
