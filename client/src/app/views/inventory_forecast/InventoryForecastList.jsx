import React, { Component } from "react";
import {
  Card,
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
import {
  getAllLocations,
  getAllWarehouseRegions,
} from "../inventory_warehouse_location/LocationService";
import { getAllLocationTypes } from "../warehouse_location_type/LocationTypeService";
import { getCompiledReport } from "./InventoryForecastService";
import { countries } from "../../constants";

class InventoryForecastList extends Component {
  state = {
    forecastType: "single",
    monthYear: new Date(),
    expanded: false,
    groupOption: "country",
    warehouseList: [],
    selectedWarehouse: null,
    countryList: countries,
    selectedCountry: null,
    typeList: [],
    selectedType: null,
    regionList: [],
    selectedRegion: null,
    compiledDataList: [],
    forecastManagerValues: [],
    rowsPerPage: 10,
    page: 0,
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
      res.data.map((item) => {
        let newObj = {
          product_id: item.product_id,
          sku: item.sku,
          upc: item.upc,
          asin: item.asin,
          name: item.name,
          this_year_sales_sold: item.this_year_sales_sold,
          last_year_sales_sold: item.last_year_sales_sold,
          last_year_next_90_sales_sold: item.last_year_next_90_sales_sold,
        };
        typeList.map((type) => {
          newObj[`${type.name}_warehouse`] = item[`${type.name}_warehouse`]
            ? item[`${type.name}_warehouse`]
            : "NA";
          newObj[`${type.name}_warehouse_inbound`] = item[
            `${type.name}_warehouse_inbound`
          ]
            ? item[`${type.name}_warehouse_inbound`]
            : "NA";
        });
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

  handleChangeMangerValue = (event, index) => {
    let { forecastManagerValues } = this.state;
    forecastManagerValues[index] = event.target.value;
    this.setState({ forecastManagerValues });
  };

  render() {
    let {
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
      forecastManagerValues,
    } = this.state;

    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Inventory Forecast" }]} />
        </div>
        {/* <Card className="w-100" elevation={6}> */}
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
                    
                    <Button
                      onClick={this.showData}
                      className="mb-16 mr-32"
                      variant="contained"
                      color="primary"
                    >
                      Create OEM order
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
                      width="40%"
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
                        let totalInLocation = 0;
                        let inboundToLocation = 0;
                        let rate = parseFloat(
                          (item.this_year_sales_sold -
                            item.last_year_sales_sold) /
                            item.this_year_sales_sold
                        );
                        rate = Number.isNaN(rate) ? 0 : rate;
                        if (item.this_year_sales_sold == 0) rate = 0;
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
                              totalInLocation +=
                                item[`${type.name}_warehouse`] === "NA"
                                  ? 0
                                  : item[`${type.name}_warehouse`];
                              inboundToLocation +=
                                item[`${type.name}_warehouse_inbound`] === "NA"
                                  ? 0
                                  : item[`${type.name}_warehouse_inbound`];
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
                              {totalInLocation}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {inboundToLocation}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {totalInLocation + inboundToLocation}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {item.this_year_sales_sold}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {item.last_year_sales_sold}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {(rate * 100).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {item.last_year_next_90_sales_sold}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {(
                                rate * 90 +
                                item.last_year_next_90_sales_sold
                              ).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(
                                totalInLocation +
                                  inboundToLocation -
                                  (rate * 90 +
                                    item.last_year_next_90_sales_sold)
                              ).toFixed(2)}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              <TextField
                                value={forecastManagerValues[index]}
                                onChange={(event) =>
                                  this.handleChangeMangerValue(event, index)
                                }
                              />
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {parseFloat(
                                totalInLocation +
                                inboundToLocation -
                                (rate * 90 +
                                  item.last_year_next_90_sales_sold) +
                                parseFloat(forecastManagerValues[index])
                              ).toFixed(2)}
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
        </Grid>
      </div>
    );
  }
}

export default InventoryForecastList;
