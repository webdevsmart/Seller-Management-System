import React, { Component } from "react";
import {
  Fab,
  Button,
  Icon,
  Card,
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  RadioGroup,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  IconButton,
  TablePagination,
  Radio
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from '@material-ui/core/CircularProgress';
import { Breadcrumb, SimpleCard } from "egret";
import CustomSelect from "./CustomSelect";
import { getAllCategories } from "../product_category/CategoryService";
import { getAllVariationType, getAllVariationValue } from "../product_variation/VariationService";
import { getAllFreight } from "../freight/FreightService";
import { getAllParts } from "../parts/PartsService";
import { addNewProduct, uploadAdditionImage } from "./ProductService"
import NumberFormat from "react-number-format";
import { generateRandomId } from "utils";
import { getAllStorage } from "../storage/StorageService";
import { getAllFullfillment } from "../fullfillment/FullfillmentService";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import moment from 'moment';
import PartsDialog from "./PartsListDialog";
import { ConfirmationDialog } from "egret";

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

function NumberWithCM(props) {
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
      suffix="cm"
    />
  );
}

class AddNewProduct extends Component {
  state = {
    productImages: [],
    name: "",
    SKU: "",
    UPC: "",
    UPCImage: null,
    ASIN: "",
    FNSKU: "",
    FNSKUImage: null,
    brand: "",
    design: "",
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
    selectedPartsIndex: [],
    notes: "",
    unitsPerCarton: 0,
    packingMaterial: 0,

    selectedStorage: null,
    fullfillmentType: "Amazon",
    storageDuration: 0,
    freightQty: 0,
    storageQty: 0,
    expanded: false,
    squareFeet: "",

    variationQualities: [],
    selectedVariationType: [],
    selectedVariationValue: [],
    variationTypeList: [],
    variationValueList: [],
    categoryList: [],
    freightList: [],
    partsList: [],
    storageList: [],
    fullfillmentList: [],
    messageOpen: false,
    message: "",
    messageType: "success",
    lightboxOpen: false,
    lightboxImages: [],
    lightboxIndex: 0,
    loading: false,
    showPartsDialog: false,
    openConfirmRemoveDialog: false,
    removeID: null,
    rowsPerPage: 10,
    page: 0,
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
      this.setState({ freightList: res.data.map(item => ({ ...item, value: item._id, label: item.name, costUSD: item.cost_usd, UM: item.UM.short_name})) });
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
    })
  }

  handleSubmit = (event) => {
    this.setState({loading: true});
    let fulfillmentFBAFee = this.state.selectedFFAmazon.value;
    if (this.state.fullfillmentType == 'ThirdPary')
      fulfillmentFBAFee = this.state.selectedFFThirdParty.value;
    else if (this.state.fullfillmentType == 'US')
      fulfillmentFBAFee = this.state.selectedFFUs.value;
    let parts = [];
    let parts_qty = [];
    this.state.selectedParts.map((part, index) => {
      if (part && part.value && part.partsQty != 0) {
        parts.push(part.value);
        parts_qty.push(part.partsQty);
      }
    });

    let variation_qualities = [];
    this.state.variationQualities.map((v) => {
      if (v.type && v.value)
        variation_qualities.push({
          type: v.type.value,
          value: v.value.value,
        });
    });

    const newProduct = {
      ID: 'P' + generateRandomId(),
      name: this.state.name,
      sku: this.state.SKU,
      upc: this.state.UPC,
      asin: this.state.ASIN,
      variation_qualities: JSON.stringify(variation_qualities),
      parent_category: this.state.selectedParentCategory.value,
      categories: this.state.selectedCategoryList.map(a => a.value),
      retail_price: parseFloat(this.state.retailPrice).toFixed(2),
      square_feet: this.state.squareFeet,
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
      parts_qty: parts_qty,
      fullfillment_fba_fee: fulfillmentFBAFee,
      fullfillment_type: this.state.fullfillmentType,
      fnsku: this.state.FNSKU,
      brand: this.state.brand,
      design: this.state.design,
      units_perCarton: this.state.unitsPerCarton,
      packing_material: this.state.packingMaterial,
    };
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
    const formData = new FormData();
    this.state.productImages.map((image) => {
      formData.append('files', image.file);
    });
    formData.append('new_product', JSON.stringify(newProduct));
    addNewProduct(formData, config).then((res) => {
      const newFormData = new FormData();
      newFormData.append('_id', res.data._id);
      newFormData.append('files', this.state.UPCImage.file)
      newFormData.append('files', this.state.FNSKUImage.file)
      uploadAdditionImage(newFormData, config).then((res1) => {
        
        this.setState({loading: false});
        this.setState({messageType: "success", messageOpen: true, message: "You added the product successfully!"}, () => {
        });
      }).catch((err) => {
        this.setState({loading: false});
        this.setState({messageType: "warning", messageOpen: true, message: "Something went wrong! please refresh and try again."}, () => {
        });
      });
    }).catch((err) => {
      this.setState({loading: false});
      this.setState({messageType: "warning", messageOpen: true, message: "Something went wrong! please refresh and try again."}, () => {
      });
    });
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
    [event.target.name]: event.target.value
    });
  }

  handleSelectVType = (data, index) => {
    let { variationQualities } = this.state;
    const check_type = variationQualities.filter(variation => (variation.type === data));
    if (check_type.length == 0) {
      getAllVariationValue(data.value).then((res) => {
        variationQualities[index].type = data;
        variationQualities[index].value = "";
        variationQualities[index].valueList = res.data.map(item => ({value: item._id, label: item._id}));
        this.setState({variationQualities});
      });
    }
  }

  handleChangePartsQty = (e, _id) => {
    let {selectedParts} = this.state;
    let index = selectedParts.findIndex(x => x._id === _id);
    if (index > -1) {
      selectedParts[index].partsQty = e.target.value;
      this.setState({selectedParts});
    }
  }
  
  handleSelectFreight = (data) => {
    let freightQty = 0;
    if (data.UM == 'CBM')
      freightQty = parseFloat(this.state.packagedWidth * this.state.packagedHeight * this.state.packagedDepth / 1000000);
    else if (data.UM == 'KG')
      freightQty = parseFloat(this.state.packagedGrams / 1000);
    else if (data.UM == 'LB')
      freightQty = parseFloat(this.state.packagedGrams / 1000 * 2.20462);
    else
      freightQty = 0;
    this.setState({freightQty: freightQty, selectedFreight: data});
  }
  
  handleSelectStorage = (data) => {
    this.setState({selectedStorage: data});
  }
  
  handleChangeMetric = (e, name) => {
    this.setState({
      [name]: e.target.value
    }, () => {
      let freightQty = 0;
      if (this.state.selectedFreight) {
        if (this.state.selectedFreight.UM == 'CBM')
          freightQty = parseFloat(this.state.packagedWidth * this.state.packagedHeight * this.state.packagedDepth / 1000000);
        else if (this.state.selectedFreight.UM == 'KG')
          freightQty = parseFloat(this.state.packagedGrams / 1000);
        else if (this.state.selectedFreight.UM == 'LB')
          freightQty = parseFloat(this.state.packagedGrams / 1000 * 2.20462);
        else
          freightQty = 0;
        this.setState({freightQty});
      }
    });

  }

  closeMessage = () => {
    this.setState({messageOpen: false});
  }

  addNewVariationList = () => {
    let { variationQualities } = this.state;
    variationQualities.push({
      type: "",
      value: "",
      valueList: [],
    });
    this.setState({variationQualities});
  }

  handleSelectVariationValue = (data, index) => {
    let {variationQualities} = this.state;
    variationQualities[index].value = data;
    this.setState({variationQualities});
  }

  handleAccordion = () => {
    let {expanded} = this.state;
    this.setState({expanded: !expanded});
  }

  handleSetImages = e => {
    let files = e.target.files;
    let {productImages} = this.state;
    for (let i = 0; i < files.length; i ++) {
      if (!files[i].type.includes('image')) {
        this.setState({messageOpen: true, message: "The file format should be image.", messageType: "warning"});
      }
      if (files[i].type.includes('image') && parseFloat(files[i].size / 1024 / 1024) <= 10) 
      {
        let newImage = {
          file: files[i],
          preview: URL.createObjectURL(files[i]),
          fileName: files[i].name,
          date: moment().format("YYYY-MM-DD HH:mm:ss"),
        }
        productImages.push(newImage);
      }
    }
    this.setState({productImages});
  }

  deleteImage = index => {
    let {productImages} = this.state;
    let item = productImages.indexOf(index);
    if (index > -1)
      productImages.splice(index, 1);
    this.setState({productImages});
  }

  downloadImage = index => {
    let {productImages} = this.state;
    const url = productImages[index].preview;
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', productImages[index].fileName);
    document.body.appendChild(link);
    link.click();
  }

  openLighbox = index => {
    this.setState({lightboxOpen: true, lightboxIndex: index})
  }

  openPartsDialog = () => {
    this.setState({showPartsDialog: true});
  }

  handlePartsDialogClose = () => {
    this.setState({showPartsDialog: false});
  }

  addSelectedParts = (ids) => {
    let {selectedParts, partsList} = this.state;
    let tempIdx = [];
    let tempParts = [];
    tempIdx.push(...ids);
    tempIdx.map((_id) => {
      const item = partsList.filter(obj => { return obj._id === _id });
      const curItem = selectedParts.filter(obj => {return obj._id === _id});
      let qty = 0;
      if (curItem.length > 0)
        qty = curItem[0].partsQty;
      tempParts.push({ ...item[0], partsQty: qty});
    });
    this.setState({selectedParts: tempParts, selectedPartsIndex: tempIdx});
  }

  removeSelectedPart = (_id) => {
    this.setState({openConfirmRemoveDialog: true, removeID: _id});
  }

  handleRemoveSelectedPart = () => {
    let {removeID, selectedParts, selectedPartsIndex} = this.state;
    const index = selectedPartsIndex.indexOf(removeID);
    if (index > -1)
    {
      selectedPartsIndex.splice(index, 1);
    }
    selectedParts = selectedParts.filter(function(el) { return el._id !== removeID });
    
    this.setState({selectedParts, selectedPartsIndex, openConfirmRemoveDialog: false, removeID: null});
  }

  handleCloseConfirmRemoveDialog = () => {
    this.setState({openConfirmRemoveDialog: false, removeID: null})
  }
  
  setPage = page => {
    this.setState({ page });
  };

  setRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  removeSelectedVariation = (index) => {
    let {variationQualities} = this.state;
    variationQualities.splice(index, 1);
    this.setState(variationQualities);
  }

  handleSetUPCImage = event => {
    let {UPCImage} = this.state;
    let file = event.target.files[0];
    if (!file.type.includes('image')) {
      this.setState({messageOpen: true, message: "The file format should be image.", messageType: "warning"});
    }
    if (file.type.includes('image') && parseFloat(file.size / 1024 / 1024) <= 10) 
    {
      UPCImage = {
        file: file,
        preview: URL.createObjectURL(file),
        fileName: file.name,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      }
    }
    this.setState({UPCImage});
  }
  
  handleSetFNSKUImage = event => {
    let {FNSKUImage} = this.state;
    let file = event.target.files[0];
    if (!file.type.includes('image')) {
      this.setState({messageOpen: true, message: "The file format should be image.", messageType: "warning"});
    }
    if (file.type.includes('image') && parseFloat(file.size / 1024 / 1024) <= 10) 
    {
      FNSKUImage = {
        file: file,
        preview: URL.createObjectURL(file),
        fileName: file.name,
        date: moment().format("YYYY-MM-DD HH:mm:ss"),
      }
    }
    this.setState({FNSKUImage});
  }

  

  render() {
    let { 
      name,
      SKU,
      UPC,
      ASIN,
      FNSKU,
      design,
      brand,
      UPCImage,
      FNSKUImage,
      retailPrice,
      selectedFFAmazon,
      selectedFFUs,
      selectedFFThirdParty,
      variationTypeList,
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
      notes,
      unitsPerCarton,
      packingMaterial,


      storageList,
      fullfillmentList,
      selectedStorage,
      storageDuration,
      fullfillmentType,
      messageOpen,
      message,
      messageType,
      variationQualities,
      expanded,
      productImages,
      squareFeet,
      lightboxOpen,
      lightboxIndex,
      loading,
      showPartsDialog,
      selectedPartsIndex,
      openConfirmRemoveDialog,
      rowsPerPage,
      page,
    } = this.state;
    let oem = 0;
    // const classes = useStyles();

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
                  disabled={loading}
                  className="py-8"
                  variant="contained"
                  color="primary"
                >
                  Save
                  {loading && <CircularProgress className="ml-10" size={24} />}
                </Button>
              </div>
            </div>
            <Grid container spacing={6}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <Accordion
                  expanded={expanded === true}
                  onChange={this.handleAccordion}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography>Click to toggle image section.</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                      <div className="list w-100">
                        <div className="grid-view">
                          <Grid container spacing={2}>
                            {productImages.map((item, index) => (
                              <Grid item sm={4} xl={2} md={3} xs={12} key={index}>
                                <Card className="grid__card flex-column h-100" elevation={6}>
                                  <div className="grid__card-top text-center">
                                    <img src={item.preview} alt="project" style={{width: '100%', height: '180px', objectFit: 'cover'}}/>
                                    <div className="grid__card-overlay flex-column">
                                      <div className="flex flex-middle flex-end">
                                        <div className="flex flex-middle">
                                        </div>
                                      </div>
                                      <div className="flex flex-middle flex-center">
                                          <Icon
                                            fontSize="small"
                                            className="mr-16 cursor-pointer text-white"
                                            onClick={(e) => this.downloadImage(index)}
                                          >
                                            cloud_download
                                          </Icon>
                                          <Icon
                                            fontSize="small"
                                            className="mr-16 cursor-pointer text-white"
                                            onClick={(e) => this.openLighbox(index)}
                                          >
                                            zoom_in
                                          </Icon>
                                          <Icon
                                            fontSize="small"
                                            className="mr-16 cursor-pointer text-white"
                                            onClick={(e) => this.deleteImage(index)}
                                          >
                                            delete
                                          </Icon>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="grid__card-bottom text-center py-8">
                                    <p className="m-0">{item.date}</p>
                                  </div>
                                </Card>
                              </Grid>
                            ))}
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item sm={12} md={12}>
                              <label htmlFor="upload-single-file">
                                <Fab
                                  className="capitalize"
                                  color="primary"
                                  component="span"
                                  variant="extended"
                                >
                                  <div className="flex flex-middle">
                                    <Icon className="pr-8">cloud_upload</Icon>
                                    <span>Upload Multiple Image</span>
                                  </div>
                                </Fab>
                              </label>
                              <input
                                className="display-none"
                                onChange={this.handleSetImages}
                                id="upload-single-file"
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg"
                                multiple
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                  </AccordionDetails>
                </Accordion>
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
                <div className="w-100 mb-16">
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
                  <label htmlFor="upload-upc-image">
                    <Fab
                      className="capitalize"
                      color="primary"
                      component="span"
                      variant="extended"
                    >
                      <div className="flex flex-middle">
                        <Icon className="pr-8">cloud_upload</Icon>
                        <span>Upload UPC Image</span>
                      </div>
                    </Fab>
                    <input
                      className="display-none"
                      onChange={this.handleSetUPCImage}
                      id="upload-upc-image"
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                    />
                  </label>
                  <div className="w-100 text-center mt-16">
                  {
                    UPCImage && (
                      <img src={UPCImage.preview} alt="project" style={{width: '200px', height: '200px', objectFit: 'cover'}}/>
                    )
                  }
                  </div>
                </div>
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
                
                <div className="w-100 mb-16">
                  <TextValidator
                    className="mb-16 w-100"
                    label="FNSKU"
                    onChange={this.handleChange}
                    type="text"
                    name="FNSKU"
                    value={FNSKU}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                  
                  <label htmlFor="upload-fnsku-image">
                    <Fab
                      className="capitalize"
                      color="secondary"
                      component="span"
                      variant="extended"
                    >
                      <div className="flex flex-middle">
                        <Icon className="pr-8">cloud_upload</Icon>
                        <span>Upload FNSKU Image</span>
                      </div>
                    </Fab>
                    <input
                      className="display-none"
                      onChange={this.handleSetFNSKUImage}
                      id="upload-fnsku-image"
                      type="file"
                      accept="image/x-png,image/gif,image/jpeg"
                    />
                  </label>
                  <div className="w-100 text-center mt-16">
                  {
                    FNSKUImage && (
                      <img src={FNSKUImage.preview} alt="project" style={{width: '200px', height: '200px', objectFit: 'cover'}}/>
                    )
                  }
                  </div>
                </div>
                <TextValidator
                  className="mb-16 w-100"
                  label="Brand"
                  onChange={this.handleChange}
                  type="text"
                  name="brand"
                  value={brand}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
                
                <TextValidator
                  className="mb-16 w-100"
                  label="Design"
                  onChange={this.handleChange}
                  type="text"
                  name="design"
                  value={design}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                />
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Table style={{border: '1px solid rgba(224, 224, 224, 1)'}}>
                  <colgroup>
                      <col style={{width:'50px'}}/>
                      <col />
                      <col />
                  </colgroup>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center' className="bg-light-green">  
                        <Fab size="small" color="primary" aria-label="Add" onClick={this.addNewVariationList}>
                          <Icon>add</Icon>
                        </Fab>
                      </TableCell>
                      <TableCell colSpan={2} align='center' className="bg-light-green">
                          <span className="font-weight-500">Variation Qualities</span>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="center"></TableCell>
                      <TableCell align="center">Type</TableCell>
                      <TableCell align="center">Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {
                      variationQualities.map((variation, index) => {
                        return (
                            <TableRow key={index}>
                              <TableCell>
                                <Tooltip title={"Remove"}>
                                    <IconButton onClick={() => this.removeSelectedVariation(index)}>
                                        <Icon>cancel</Icon>
                                    </IconButton>
                                </Tooltip>
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
                                  options={variationTypeList}
                                  handleChange={(data) => this.handleSelectVType(data, index)}
                                  selectedValue={variation.type}
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
                                  options={variation.valueList}
                                  handleChange={(data) => this.handleSelectVariationValue(data, index)}
                                  selectedValue={variation.value}
                                />
                              </TableCell>
                            </TableRow>
                        );
                      })
                    }
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
                <TextField
                  value={squareFeet}
                  className="w-100 mb-16"
                  onChange={this.handleChange}
                  name="squareFeet"
                  label="Square Feet of Leather"
                />
              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
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
              </Grid>        
              <Grid item lg={3} md={3} sm={12} xs={12}>
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
              </Grid>
              <Grid item lg={3} md={3} sm={4} xs={4} className="pl-16">
                {selectedFFAmazon && (
                  <TextField 
                    label='ID'
                    type="text"
                    value={selectedFFAmazon.ID}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={3} md={3} sm={4} xs={4}>
                {selectedFFAmazon && (
                  <TextField 
                    label='Rate'
                    type="text"
                    value={`$${selectedFFAmazon.rate}`}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={3} md={3} sm={4} xs={4}>
                {selectedFFAmazon && (
                  <TextField 
                    label='UM'
                    type="text"
                    value={selectedFFAmazon.UM.name}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
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
              </Grid>
              <Grid item lg={3} md={3} sm={4} xs={4}>
                {selectedFFThirdParty && (
                  <TextField 
                    label='ID'
                    type="text"
                    value={selectedFFThirdParty.ID}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={3} md={3} sm={4} xs={4}>
                {selectedFFThirdParty && (
                  <TextField 
                    label='Rate'
                    type="text"
                    value={`$${selectedFFThirdParty.rate}`}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={3} md={3} sm={4} xs={4}>
                {selectedFFThirdParty && (
                  <TextField 
                    label='UM'
                    type="text"
                    value={selectedFFThirdParty.UM.name}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={3} md={3} sm={12} xs={12}>
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
              </Grid>
              <Grid item lg={3} md={3} sm={4} xs={4}>
                {selectedFFUs && (
                  <TextField 
                    label='ID'
                    type="text"
                    value={selectedFFUs.ID}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={3} md={3} sm={4} xs={4}>
                {selectedFFUs && (
                  <TextField 
                    label='Rate'
                    type="text"
                    value={`$${selectedFFUs.rate}`}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={3} md={3} sm={4} xs={4}>
                {selectedFFUs && (
                  <TextField 
                    label='UM'
                    type="text"
                    value={selectedFFUs.UM.name}
                    readOnly />
                )}
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
                                      inputComponent: NumberWithCM,
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
                                      inputComponent: NumberWithCM,
                                    }}
                                    name="productHeight"
                                    value={productHeight}
                                />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangeMetric(e, "productDepth")}
                                    InputProps={{
                                      inputComponent: NumberWithCM,
                                    }}
                                    name="productDepth"
                                    value={productDepth}
                                />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                                {parseFloat((productWidth * productHeight * productDepth)/1000000).toFixed(2)}
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
                                      inputComponent: NumberWithCM,
                                    }}
                                    name="packagedWidth"
                                    value={packagedWidth}
                                />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangeMetric(e, "packagedHeight")}
                                    InputProps={{
                                      inputComponent: NumberWithCM,
                                    }}
                                    name="packagedHeight"
                                    value={packagedHeight}
                                />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangeMetric(e, "packagedDepth")}
                                    InputProps={{
                                      inputComponent: NumberWithCM,
                                    }}
                                    name="packagedDepth"
                                    value={packagedDepth}
                                />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat((packagedWidth * packagedHeight * packagedDepth)/1000000).toFixed(2)}
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
                            <TableCell align="center">CBF</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell className="px-10" align="center">
                              {parseFloat(productWidth * 0.393701).toFixed(2)} Inches
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(productHeight * 0.393701).toFixed(2)} Inches
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(productDepth * 0.393701).toFixed(2)} Inches
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat((productWidth * 0.393701 * productHeight * 0.393701 * productDepth * 0.393701)/1728).toFixed(2)}
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
                                CBF
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell className="px-10" align="center">
                              {parseFloat(packagedWidth * 0.393701).toFixed(2)} Inches
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(packagedHeight * 0.393701).toFixed(2)} Inches
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(packagedDepth * 0.393701).toFixed(2)} Inches
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat((packagedWidth * 0.393701 * packagedHeight * 0.393701 * packagedDepth * 0.393701)/1728).toFixed(2)}
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
              
        {/* =================== Select Freight Part =================== */}
              <Grid item lg={4} md={4} sm={6} xs={12}>
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
              <Grid item lg={1} md={4} sm={6} xs={6} className="text-center">
                {
                  selectedFreight && (
                    <TextField 
                      label='ID'
                      type="text"
                      name="id"
                      value={selectedFreight.ID}
                      readOnly
                      />
                  )
                }
              </Grid>
              <Grid item lg={2} md={4} sm={6} xs={6} className="text-center">
                {
                  selectedFreight && (
                    <TextField 
                      type="text"
                      label='QTY'
                      name="freightQty"
                      value={freightQty}
                      readOnly
                      />
                  )
                }
              </Grid>
              <Grid item lg={1} md={4} sm={6} xs={6} className="text-center">
                {
                  selectedFreight && (
                    <TextField 
                      label='Rate'
                      type="text"
                      name="rate"
                      value={`$${selectedFreight.costUSD}`}
                      readOnly
                      />
                  )
                }
              </Grid>
              <Grid item lg={2} md={4} sm={6} xs={6} className="text-center">
                {selectedFreight && (
                  <TextField 
                    label='UM'
                    type="text"
                    value={selectedFreight.UM}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={2} md={4} sm={6} xs={6} className="text-center">
                {selectedFreight && (
                  <TextField 
                    label='Cost USD'
                    type="text"
                    value={'$ ' + parseFloat(selectedFreight.costUSD * freightQty).toFixed(2)}
                    readOnly />
                )}
              </Grid> 
        {/* =================== End Select Freight Part =================== */}

        {/* =================== Select Storage Part =================== */}
              <Grid item lg={4} md={4} sm={6} xs={12}>
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
                  handleChange={this.handleSelectStorage}
                />
              </Grid>
              <Grid item lg={1} md={4} sm={6} xs={6} className="text-center">
                {
                  selectedStorage && (
                    <TextField 
                      label='ID'
                      type="text"
                      name="id"
                      value={selectedStorage.ID}
                      readOnly
                      />
                  )
                }
              </Grid>
              <Grid item lg={2} md={4} sm={6} xs={6} className="text-center">
                {
                  selectedStorage && (
                    <TextField 
                      label='Duration'
                      type="number"
                      name="storageDuration"
                      value={storageDuration}
                      onChange={this.handleChange}
                      />
                  )
                }
              </Grid>
              <Grid item lg={1} md={4} sm={6} xs={6} className="text-center">
                {
                  selectedStorage && (
                    <TextField 
                      label='Rate'
                      type="text"
                      name="rate"
                      value={`$${selectedStorage.rate}`}
                      readOnly
                      />
                  )
                }
              </Grid>
              <Grid item lg={2} md={4} sm={6} xs={6} className="text-center">
                {selectedStorage && (
                  <TextField 
                    label='UM'
                    type="text"
                    value={selectedStorage.UM}
                    readOnly />
                )}
              </Grid>
              <Grid item lg={2} md={4} sm={6} xs={6} className="text-center">
                {selectedStorage && (
                  <TextField 
                    label='Cost USD'
                    type="text"
                    value={'$ ' + parseFloat(selectedStorage.rate * storageDuration).toFixed(2)}
                    readOnly />
                )}
              </Grid>
        {/* =================== Ebd Storage Part =================== */}

              <Grid item lg={6} md={6} sm={6} xs={12}>
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

              <Grid item lg={2} md={2} sm={2} xs={12}>
                <span className="mb-16">Prepare To Ship</span>
                
                <TextField
                  className="mb-16 w-100"
                  onChange={(e) => this.setState({unitsPerCarton: e.target.value})}
                  label="Units Per Carton"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  name="unitsPerCarton"
                  value={unitsPerCarton}
                />
              </Grid>

              <Grid item lg={2} md={2} sm={2} xs={12}>
                <div className="w-100">
                <span className="mb-16">Packing Materials</span>
                
                <TextField
                  className="mb-16 w-100"
                  onChange={(e) => this.setState({packingMaterial: e.target.value})}
                  label= "Grams"
                  InputProps={{
                    inputComponent: NumberFormatCustom,
                  }}
                  name="packingMaterial"
                  value={packingMaterial}
                />

                <TextValidator
                    className="mb-16 w-100"
                    label="Pounds"
                    type="text"
                    value={parseFloat(packingMaterial / 1000 * 2.20462).toFixed(2)}
                    readOnly
                />
                </div>
              </Grid>

              <Grid item lg={2} md={2} sm={2} xs={12}>
                
                <span className="mb-16">Packed Carton Weight</span>
                
                <TextValidator
                    className="mb-16 w-100"
                    label="Grams"
                    type="text"
                    value={(parseFloat(packagedGrams) * parseFloat(unitsPerCarton) + parseFloat(packingMaterial)).toFixed(2)}
                    readOnly
                />
                
                <TextValidator
                    className="mb-16 w-100"
                    label="Pounds"
                    type="text"
                    value={
                      parseFloat((parseFloat(packagedGrams) * parseFloat(unitsPerCarton) + parseFloat(packingMaterial))/1000 * 2.20462).toFixed(2)
                    }
                    readOnly
                />

              </Grid>

              <Grid item lg={12} md={12} sm={12} xs={12}>
                <div className="w-100 overflow-auto" style={{paddingBottom: '250px'}}>
                  <Table style={{border: '1px solid rgba(224, 224, 224, 1)', whiteSpace: "pre"}}>
                      <colgroup>
                          <col style={{width:'30px'}}/>
                          <col style={{width:'100px'}}/>
                          <col style={{width:'300px'}}/>
                          <col style={{width:'100px'}}/>
                          <col style={{width:'100px'}}/>
                          <col style={{width:'100px'}}/>
                          <col style={{width:'50px'}}/>
                          <col style={{width:'50px'}}/>
                          <col style={{width:'100px'}}/>
                      </colgroup>
                      <TableHead>
                          <TableRow>
                              <TableCell colSpan={9} align='center' className="bg-light-green">
                                  PARTS
                              </TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell align='center' colSpan={2}>
                                <Fab size="small" color="primary" aria-label="Add" onClick={this.openPartsDialog}>
                                  <Icon>add</Icon>
                                </Fab>
                              </TableCell>
                              <TableCell colSpan={6} align='right'>
                                OEM:
                              </TableCell>
                              <TableCell colSpan={1}>
                                {
                                  selectedParts.map((part, index) => {
                                    if (part && part.cost_usd && part.partsQty)
                                      oem += parseFloat(part.cost_usd) * parseFloat(part.partsQty);
                                  })
                                }
                                $ {oem.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </TableCell>
                          </TableRow>
                          <TableRow>
                              <TableCell align="center"></TableCell>
                              <TableCell align="center">ID Code</TableCell>
                              <TableCell align="center">Name</TableCell>
                              <TableCell align="center">Type</TableCell>
                              <TableCell align="center">Supplier Country</TableCell>
                              <TableCell align="center">UM</TableCell>
                              <TableCell align="center">UPrice</TableCell>
                              <TableCell align="center">Qty</TableCell>
                              <TableCell align="center">Total</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                        {
                          selectedParts && selectedParts
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((part, index) => {
                            return (
                              <TableRow key={index}>
                                <TableCell className="px-10" align="center">
                                  <Tooltip title={"Remove"}>
                                      <IconButton onClick={() => this.removeSelectedPart(part._id)}>
                                          <Icon>cancel</Icon>
                                      </IconButton>
                                  </Tooltip>
                                </TableCell>
                                <TableCell className="px-10" align="center">
                                  {part.ID}
                                </TableCell>
                                <TableCell align='center' component="th" scope="row" className="pr-10">
                                  {part.name}
                                </TableCell>
                              <TableCell className="px-10" align="center">
                                {part.type.name}
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                {part.supplier_id.country}
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                {part.UM.short_name}
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                $ {part.cost_usd}
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                <TextField
                                    onChange={(e) => this.handleChangePartsQty(e, part._id)}
                                    InputProps={{
                                      inputComponent: NumberFormatCustom,
                                    }}
                                    value={part.partsQty}
                                />
                              </TableCell>
                              <TableCell className="px-10" align="center">
                                $ {(parseFloat(part.partsQty * part.cost_usd).toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                              </TableCell>
                            </TableRow>
                            )
                            
                          })
                        }
                          
                      </TableBody>
                  </Table>
                  <TablePagination
                    className="px-16"
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={selectedParts.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                      "aria-label": "Next Page"
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.setRowsPerPage}
                  />
                </div>
              </Grid>     
            </Grid>
          </ValidatorForm>
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            open={messageOpen}
            autoHideDuration={2000}
            onClose={this.closeMessage}
          >
            <MySnackbarContentWrapper
              onClose={this.closeMessage}
              variant={messageType}
              message={message}
            />
          </Snackbar>

          
          {openConfirmRemoveDialog && (
            <ConfirmationDialog
              open={openConfirmRemoveDialog}
              onConfirmDialogClose={this.handleCloseConfirmRemoveDialog}
              onYesClick={this.handleRemoveSelectedPart}
              text="Are you sure to remove it?"
            />
          )}

          {
            showPartsDialog && (
              <PartsDialog
                open={showPartsDialog}
                handleClose={this.handlePartsDialogClose}
                partsList={partsList}
                addParts={(ids) => this.addSelectedParts(ids)}
                allSelectedPartsIndex={selectedPartsIndex}
              />
            )
          }

          { lightboxOpen && productImages && (
            <Lightbox
              mainSrc={productImages[lightboxIndex].preview}
              nextSrc={productImages[(lightboxIndex + 1) % productImages.length].preview}
              prevSrc={productImages[(lightboxIndex + productImages.length - 1) % productImages.length].preview}
              onCloseRequest={() => this.setState({ lightboxOpen: false })}
              onMovePrevRequest={() =>
                this.setState({
                  lightboxIndex: (lightboxIndex + productImages.length - 1) % productImages.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  lightboxIndex: (lightboxIndex + 1) % productImages.length,
                })
              }
            />
          )}
        </SimpleCard>
      </div>
    );
  }
}

export default AddNewProduct;
