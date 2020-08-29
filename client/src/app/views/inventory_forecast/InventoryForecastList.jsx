import React, { Component } from "react";
import {
  Card,
  CardContent,
  Snackbar,
  Grid,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  TextField,
} from "@material-ui/core";
import { Breadcrumb } from "egret";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";
import {
  getAllLocations,
  getAllWarehouseRegions,
} from "../inventory_warehouse_location/LocationService";
import { getAllLocationTypes } from "../warehouse_location_type/LocationTypeService";
import { getCompiledReport, addNewOEMOrder } from "./InventoryForecastService";
import { countries } from "../../constants";
import { generateRandomId } from "utils";

class InventoryForecastList extends Component {
  state = {
    orderList: [],
    forecastType: "single",
    monthYear: new Date(),
    expanded: false,
    groupOption: "country",
    warehouseList: [],
    selectedWarehouse: null,
    warehouseForQty: null,
    countryList: countries,
    selectedCountry: null,
    typeList: [],
    selectedType: null,
    regionList: [],
    selectedRegion: null,
    compiledDataList: [],
    forecastManagerValues: [],
    warehouseQtyList: [],
    rowsPerPage: 10,
    page: 0,
    messageType: "warning",
    messageOpen: false,
    messageContent: "",
  };

  componentDidMount() {
    getAllLocations().then((res) => {
      let tmpList = res.data.map((item) => {
        return {
          ...item,
          label: item.ID + " - " + item.short_name,
          value: item._id,
        };
      });
      this.setState({ warehouseList: tmpList });
    });
    getAllLocationTypes().then((res) => {
      let tmpList = res.data.map((item) => {
        return { ...item, label: item.name, value: item._id };
      });
      this.setState({ typeList: tmpList });
    });
    getAllWarehouseRegions().then((res) => {
      let regionList = res.data.map((item) => {
        return { label: item._id, value: item._id };
      });
      this.setState({ regionList });
    });
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAccordion = () => {
    let { expanded } = this.state;
    this.setState({ expanded: !expanded });
  };

  showData = () => {
    let postData = {
      forecastType: this.state.forecastType,
      groupOption: this.state.groupOption,
      warehouse: this.state.selectedWarehouse
        ? this.state.selectedWarehouse.value
        : null,
      country: this.state.selectedCountry
        ? this.state.selectedCountry.value
        : null,
      type: this.state.selectedType ? this.state.selectedType.value : null,
      region: this.state.selectedRegion
        ? this.state.selectedRegion.value
        : null,
      monthYear: this.state.monthYear,
    };
    getCompiledReport(postData).then((res) => {
      let { compiledDataList, typeList } = this.state;
      compiledDataList = [];
      console.log(res.data);
      let warehouseQtyList = res.data.warehouseList.map((item) => {
        return { 
          ...item,
          label: item.ID + " - " + item.short_name,
          value: item._id
        };
      });
      this.setState({warehouseQtyList});
      res.data.results.map((item) => {
        
        let rate = parseFloat(
          (item.this_year_sales_sold -
            item.last_year_sales_sold) /
            item.this_year_sales_sold
        );
        rate = Number.isNaN(rate) ? 0 : rate;
        if (item.this_year_sales_sold == 0) rate = 0;
        
        let newObj = {
          product_id: item.product_id,
          sku: item.sku,
          upc: item.upc,
          asin: item.asin,
          name: item.name,
          this_year_sales_sold: item.this_year_sales_sold,
          last_year_sales_sold: item.last_year_sales_sold,
          last_year_next_90_sales_sold: item.last_year_next_90_sales_sold,
          rate: rate,
          totalInLocation: 0,
          inboundToLocation: 0,
          manager: 0,
          warehouseQty: 0,
        };
        typeList.map((type) => {
          newObj.totalInLocation += item[`${type.name}_warehouse`] ? item[`${type.name}_warehouse`] : 0;
          newObj[`${type.name}_warehouse`] = item[`${type.name}_warehouse`]
            ? item[`${type.name}_warehouse`]
            : "NA";
          newObj.inboundToLocation = item[`${type.name}_warehouse_inbound`] ? item[`${type.name}_warehouse_inbound`] : 0;
          newObj[`${type.name}_warehouse_inbound`] = item[
            `${type.name}_warehouse_inbound`
          ]
            ? item[`${type.name}_warehouse_inbound`]
            : "NA";
        });
        let finalQty = parseFloat( newObj.totalInLocation + newObj.inboundToLocation - (newObj.rate * 90 +  item.last_year_next_90_sales_sold) + parseFloat(newObj.manager ? newObj.manager : 0));
        newObj.finalQty = finalQty;
        compiledDataList.push(newObj);
      });
      this.setState({ compiledDataList });
    });
  };

  setPage = (page) => {
    this.setState({ page });
  };

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleChangeMangerValue = (event, product_id) => {
    let { compiledDataList } = this.state;
    let index = compiledDataList.findIndex(x => x.product_id ===product_id);
    compiledDataList[index].manager = event.target.value;
    
    compiledDataList[index].finalQty = parseFloat(
      compiledDataList[index].totalInLocation +
      compiledDataList[index].inboundToLocation -
      (compiledDataList[index].rate * 90 +
        compiledDataList[index].last_year_next_90_sales_sold) +
      parseFloat(compiledDataList[index].manager ? compiledDataList[index].manager : 0)
    ).toFixed(2)

    this.setState({ compiledDataList });
  };

  handleChangeWarehouseQTY = (event, product_id) => {
    let { compiledDataList } = this.state;
    let index = compiledDataList.findIndex(x => x.product_id ===product_id);
    compiledDataList[index].warehouseQty = event.target.value;
    this.setState({ compiledDataList });
  }

  createOEMOrder = () => {
    let {compiledDataList} = this.state;
    let newItems = compiledDataList.map((item, index) => {
      return {
        product_id: item.product_id,
        warehouse_qty: item.warehouseQty ? item.warehouseQty : 0,
        order_qty: item.finalQty ? item.finalQty : 0,
      }
    });
    let postData = {
      ID: "O" + generateRandomId(),
      items: newItems,
      warehouse_for_qty: this.state.warehouseForQty.value,
      date: this.state.monthYear,
      forecast_type: this.state.forecastType,
      selected_warehouse: this.state.selectedWarehouse ? this.state.selectedWarehouse.value : null,
      selected_country: this.state.selectedCountry ? this.state.selectedCountry.value : null,
      selected_region: this.state.selectedRegion ? this.state.selectedRegion.value : null,
      selected_type: this.state.selectedType ? this.state.selectedType.value : null,
      submitted_user: JSON.parse(localStorage.getItem("auth_user"))._id,
      editted_user: JSON.parse(localStorage.getItem("auth_user"))._id,
    };
    addNewOEMOrder(postData).then((res) => {
      this.setState({messageOpen: true, messageType: 'success', messageContent: 'OEM order has been created successfully.'});
      let initial = {
        orderList: [],
        forecastType: "single",
        monthYear: new Date(),
        expanded: false,
        groupOption: "country",
        selectedWarehouse: null,
        warehouseForQty: null,
        selectedCountry: null,
        selectedType: null,
        selectedRegion: null,
        compiledDataList: [],
        forecastManagerValues: [],
        warehouseQtyList: [],
        rowsPerPage: 10,
        page: 0,
      }
      this.setState({...initial});
    });
  }

  closeMessage = () => {
    this.setState({ messageOpen: false });
  };


  render() {
    let {
      warehouseQtyList,
      forecastType,
      monthYear,
      warehouseList,
      selectedWarehouse,
      expanded,
      groupOption,
      countryList,
      selectedCountry,
      typeList,
      selectedType,
      regionList,
      selectedRegion,
      compiledDataList,
      rowsPerPage,
      page,
      warehouseForQty,
      messageOpen,
      messageType,
      messageContent
    } = this.state;

    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Inventory Forecast" }]} />
        </div>
        <div className="w-100 mb-24">
          <Grid container spacing={2}>
            <Grid item lg={8} md={8} sm={6} xs={12}>
              <CustomSelect
                textFieldProps={{
                  label: "Select Warehouse",
                  InputLabelProps: {
                    htmlFor: "react-select-single",
                    shrink: true,
                  },
                  placeholder: "",
                }}
                options={warehouseQtyList}
                handleChange={(data) =>
                  this.setState({ warehouseForQty: data })
                }
                selectedValue={warehouseForQty}
              />
            </Grid>
            <Grid item lg={4} md={4} sm={6} xs={12}>
              <Button
                onClick={this.createOEMOrder}
                className="mb-16 mr-32"
                variant="contained"
                color="primary"
              >
                Create OEM order
              </Button>
            </Grid>
          </Grid>
        </div>
        <Accordion expanded={expanded === true} onChange={this.handleAccordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Forecast Setting</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="list w-100">
              <div className="grid-view">
                <Grid container spacing={2}>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <RadioGroup
                      className="mb-16"
                      value={forecastType}
                      name="forecastType"
                      onChange={this.handleChange}
                      row
                    >
                      <FormControlLabel
                        value="single"
                        control={<Radio color="secondary" />}
                        label="Single"
                        labelPlacement="end"
                      />
                      <FormControlLabel
                        control={<Radio color="secondary" />}
                        value="group"
                        labelPlacement="end"
                        label="Group"
                      />
                    </RadioGroup>
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        className="mb-16 w-100"
                        views={["year", "month"]}
                        margin="none"
                        id="mui-pickers-date"
                        label="Select Year/Month for Sales Report"
                        inputVariant="standard"
                        type="text"
                        autoOk={true}
                        value={monthYear}
                        format={"yyyy-MMM"}
                        onChange={(date) => this.setState({ monthYear: date })}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item lg={4} md={4} sm={6} xs={12}>
                    <Button
                      onClick={this.showData}
                      className="mb-16 mr-32"
                      variant="contained"
                      color="secondary"
                    >
                      Compiled Data
                    </Button>

                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    {forecastType === "single" && (
                      <>
                        <CustomSelect
                          textFieldProps={{
                            label: "Select Warehouse",
                            InputLabelProps: {
                              htmlFor: "react-select-single",
                              shrink: true,
                            },
                            placeholder: "",
                          }}
                          options={warehouseList}
                          handleChange={(data) =>
                            this.setState({ selectedWarehouse: data })
                          }
                          selectedValue={selectedWarehouse}
                        />
                      </>
                    )}
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    {forecastType === "group" && (
                      <>
                        <RadioGroup
                          className="mb-16"
                          value={groupOption}
                          name="groupOption"
                          onChange={this.handleChange}
                          row
                        >
                          <FormControlLabel
                            value="country"
                            control={<Radio color="primary" />}
                            label="Country"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            control={<Radio color="primary" />}
                            value="type"
                            labelPlacement="end"
                            label="Type"
                          />
                          <FormControlLabel
                            control={<Radio color="primary" />}
                            value="region"
                            labelPlacement="end"
                            label="Region"
                          />
                        </RadioGroup>
                      </>
                    )}
                  </Grid>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    {forecastType === "group" && groupOption === "country" && (
                      <CustomSelect
                        textFieldProps={{
                          label: "Select Country",
                          InputLabelProps: {
                            htmlFor: "react-select-single",
                            shrink: true,
                          },
                          placeholder: "",
                        }}
                        options={countryList}
                        handleChange={(data) =>
                          this.setState({ selectedCountry: data })
                        }
                        selectedValue={selectedCountry}
                      />
                    )}
                    {forecastType === "group" && groupOption === "type" && (
                      <CustomSelect
                        textFieldProps={{
                          label: "Select Warehouse Type",
                          InputLabelProps: {
                            htmlFor: "react-select-single",
                            shrink: true,
                          },
                          placeholder: "",
                        }}
                        options={typeList}
                        handleChange={(data) =>
                          this.setState({ selectedType: data })
                        }
                        selectedValue={selectedType}
                      />
                    )}
                    {forecastType === "group" && groupOption === "region" && (
                      <CustomSelect
                        textFieldProps={{
                          label: "Select Region",
                          InputLabelProps: {
                            htmlFor: "react-select-single",
                            shrink: true,
                          },
                          placeholder: "",
                        }}
                        options={regionList}
                        handleChange={(data) =>
                          this.setState({ selectedRegion: data })
                        }
                        selectedValue={selectedRegion}
                      />
                    )}
                  </Grid>
                </Grid>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        {/* </Card> */}
        <Grid
          container
          spacing={4}
          className="mt-20"
          style={{ marginBottom: "250px" }}
        >
          <Grid item sm={12} xs={12}>
            <div className="w-100 overflow-auto">
              <Table
                style={{
                  border: "1px solid rgba(224, 224, 224, 1)",
                  whiteSpace: "pre",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      className="bg-light-green"
                      width="15%"
                    >
                      Product
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={typeList.length + 3}
                      width="35%"
                      className="bg-primary"
                    ></TableCell>
                    <TableCell
                      align="center"
                      colSpan={5}
                      className="bg-secondary"
                      width="25%"
                    >
                      Sales
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={3}
                      className="bg-error"
                      width="20%"
                    >
                      Forecast
                    </TableCell>
                    <TableCell
                      align="center"
                      className="bg-primary"
                      width="5%"
                    >
                      
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">Product</TableCell>
                    {typeList.map((item, index) => {
                      return (
                        <TableCell
                          align="center"
                          key={index}
                        >{`${item.name} Warehouse`}</TableCell>
                      );
                    })}
                    <TableCell align="center">Total In Location</TableCell>
                    <TableCell align="center">Inbound to Location</TableCell>
                    <TableCell align="center">Total</TableCell>
                    <TableCell align="center">This Year</TableCell>
                    <TableCell align="center">Last Year</TableCell>
                    <TableCell align="center">+/-%</TableCell>
                    <TableCell align="center">Last Year Next 90 Days</TableCell>
                    <TableCell align="center">90 Days Forecast</TableCell>
                    <TableCell align="center">Darft Qty</TableCell>
                    <TableCell align="center">Manager + / -</TableCell>
                    <TableCell align="center">Final Order Qty</TableCell>
                    <TableCell align="center">Warehouse QTY</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {compiledDataList &&
                    compiledDataList
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((item, index) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="px-10" align="center">
                              <div className="flex flex-wrap font-size-13 text-align-left">
                                <p className="mr-10">
                                  <label className="font-weight-bold">
                                    SKU:{" "}
                                  </label>
                                  {item.sku}
                                </p>
                                <p className="mr-10">
                                  <label className="font-weight-bold">
                                    UPC:{" "}
                                  </label>
                                  {item.upc}
                                </p>
                              </div>
                              <div className="flex flex-wrap font-size-13 text-align-left">
                                <p className="mr-10">
                                  <label className="font-weight-bold">
                                    Name:{" "}
                                  </label>
                                  {item.name}
                                </p>
                                <p className="mr-10">
                                  <label className="font-weight-bold">
                                    ASIN:{" "}
                                  </label>
                                  {item.asin}
                                </p>
                              </div>
                            </TableCell>
                            {typeList.map((type, typeIndex) => {
                              return (
                                <TableCell
                                  className="px-10"
                                  align="center"
                                  key={typeIndex}
                                >
                                  {item[`${type.name}_warehouse`]}
                                </TableCell>
                              );
                            })}
                            <TableCell className="px-10" align="center">
                              {item.totalInLocation}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {item.inboundToLocation}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {item.totalInLocation + item.inboundToLocation}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {item.this_year_sales_sold}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {item.last_year_sales_sold}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {(item.rate * 100).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {item.last_year_next_90_sales_sold}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {(
                                item.rate * 90 +
                                item.last_year_next_90_sales_sold
                              ).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(
                                item.totalInLocation +
                                item.inboundToLocation -
                                  (item.rate * 90 +
                                    item.last_year_next_90_sales_sold)
                              ).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              <TextField
                                value={item.manager ? item.manager : 0}
                                onChange={(event) =>
                                  this.handleChangeMangerValue(event, item.product_id )
                                }
                              />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {item.finalQty}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              <TextField
                                value={item.warehouseQty ? item.warehouseQty : 0}
                                onChange={(event) =>
                                  this.handleChangeWarehouseQTY(event, item.product_id)
                                }
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>
              </Table>
              <TablePagination
                className="px-16"
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={compiledDataList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                  "aria-label": "Previous Page",
                }}
                nextIconButtonProps={{
                  "aria-label": "Next Page",
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.setRowsPerPage}
              />
            </div>
          </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={messageOpen}
          autoHideDuration={2000}
          onClose={this.closeMessage}
        >
          <MySnackbarContentWrapper
            onClose={this.closeMessage}
            variant={messageType}
            message={messageContent}
          />
        </Snackbar>
        </Grid>
      </div>
    );
  }
}

export default InventoryForecastList;
