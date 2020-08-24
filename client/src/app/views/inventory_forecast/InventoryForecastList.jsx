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
  TablePagination
} from "@material-ui/core";
import { Breadcrumb } from "egret";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import { getAllLocations } from "../inventory_warehouse_location/LocationService";
import { getAllLocationTypes } from "../warehouse_location_type/LocationTypeService";
import { getCompiledReport } from "./InventoryForecastService";
import { countries } from "../../constants";

class InventoryForecastList extends Component {
  state = {
    forecastType: "single",
    expanded: false,
    groupOption: "country",
    warehouseList: [],
    selectedWarehouse: null,
    countryList: countries,
    selectedCountry: null,
    typeList: [],
    selectedType: null,
    compiledDataList: [],
    rowsPerPage: 10,
    page: 0,
  };

  componentDidMount() {
    getAllLocations().then((res) => {
      let tmpList = res.data.map((item) => { return { ...item, label: item.ID + ' - ' + item.short_name, value: item._id } });
      this.setState({ warehouseList: tmpList });
    });
    getAllLocationTypes().then((res) => {
      let tmpList = res.data.map((item) => { return { ...item, label: item.name, value: item._id } });
      this.setState({ typeList: tmpList });
    });
  }

  handleChange = (event) => {
    event.persist();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleAccordion = () => {
    let {expanded} = this.state;
    this.setState({expanded: !expanded});
  }

  showData = () => {
    let postData = {
      forecastType: this.state.forecastType,
      warehouse: this.state.selectedWarehouse ? this.state.selectedWarehouse.value : null,
      country: this.state.selectedCountry ? this.state.selectedCountry.value : null,
      type: this.state.selectedType ? this.state.selectedType : null,
    }
    getCompiledReport(postData).then((res) => {
      let {compiledDataList, typeList} = this.state;
      compiledDataList = [];
      if (res.data.is_exist === true) {
        res.data.results.map((item) => {
          let newObj = {
            product_id: item.product_id,
            sku: item.sku,
            upc: item.upc,
            asin: item.asin,
            name: item.name,
          };
          typeList.map((type) => {
            newObj[`${type.name}_warehouse`] = item[`${type.name}_warehouse`] ? item[`${type.name}_warehouse`] : 'NA';
            newObj[`${type.name}_warehouse_inbound`] = item[`${type.name}_warehouse_inbound`] ? item[`${type.name}_warehouse_inbound`] : 'NA';
          });
          compiledDataList.push(newObj);
        });
      }
      else if (res.data.is_exist === false) {
        res.data.results.map((item) => {
          let newObj = {
            product_id: item.product_id,
            sku: item.sku,
            upc: item.upc,
            asin: item.asin,
            name: item.name,
          };
          typeList.map((type) => {
            newObj[`${type.name}_warehouse`] = 'NA';
            newObj[`${type.name}_warehouse_inbound`] = 'NA';
          });
          compiledDataList.push(newObj);
        });
      }
      this.setState({compiledDataList});
    });
  }

  setPage = (page) => {
    this.setState({ page });
  };

  setRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  render() {
    let {
      forecastType,
      warehouseList,
      selectedWarehouse,
      expanded,
      groupOption,
      countryList,
      selectedCountry,
      typeList,
      selectedType,
      compiledDataList,
      rowsPerPage,
      page,
    } = this.state;
    
    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Inventory Forecast" }]} />
        </div>
        {/* <Card className="w-100" elevation={6}> */}
          <Accordion
            expanded={expanded === true}
            onChange={this.handleAccordion}
          >
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
                      <Grid item lg={6} md={6} sm={6} xs={12}>
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
                      <Grid item lg={6} md={6} sm={6} xs={12}>
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
                        {
                          forecastType === 'single' && (
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
                                handleChange={(data) => this.setState({selectedWarehouse: data})}
                                selectedValue={selectedWarehouse}
                              />
                            </>
                          )
                        }
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        {
                          forecastType === 'group' && (
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
                              </RadioGroup>
                            </>
                          )
                        }
                      </Grid>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        {
                          forecastType === 'group' && groupOption === 'country' && (
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
                              handleChange={(data) => this.setState({selectedCountry: data})}
                              selectedValue={selectedCountry}
                            />
                          )
                        }
                        {
                          forecastType === 'group' && groupOption === 'type' && (
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
                              handleChange={(data) => this.setState({selectedType: data})}
                              selectedValue={selectedType}
                            />
                          )
                        }
                      </Grid>
                    </Grid>
                  </div>
                </div>
            </AccordionDetails>
          </Accordion>
        {/* </Card> */}
        <Grid container spacing={4} style={{ marginBottom: "250px" }}>
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
                      colSpan={4}
                      className="bg-light-green"
                    >
                      Product
                    </TableCell>
                    <TableCell
                      align="center"
                      colSpan={typeList.length + 3}
                      className="bg-primary"
                    ></TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">SKU</TableCell>
                    <TableCell align="center">UPC</TableCell>
                    <TableCell align="center">ASIN</TableCell>
                    <TableCell align="center">Name</TableCell>
                    {
                      typeList.map((item, index) => {
                        return (                    
                          <TableCell align="center" key={index}>{`${item.name} Warehouse`}</TableCell>
                        )
                      })
                    }
                    <TableCell align="center">Total In Location</TableCell>
                    <TableCell align="center">Inbound to Location</TableCell>
                    <TableCell align="center">Total</TableCell>
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
                        return (
                          <TableRow key={index}>
                            <TableCell className="px-10" align="center">
                              {item.sku}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {item.upc}
                            </TableCell>
                            <TableCell align="center" className="px-10">
                              {item.asin}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {item.name}
                            </TableCell>
                            {
                              typeList.map((type, typeIndex) => {
                                totalInLocation += item[`${type.name}_warehouse`] === 'NA' ? 0 : item[`${type.name}_warehouse`];
                                inboundToLocation += item[`${type.name}_warehouse_inbound`] === 'NA' ? 0 : item[`${type.name}_warehouse_inbound`];
                                return (
                                  <TableCell className="px-10" align="center" key={typeIndex}>
                                    {item[`${type.name}_warehouse`]}
                                  </TableCell>
                                )
                              })
                            }
                            <TableCell className="px-10" align="center">
                              {totalInLocation}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {inboundToLocation}
                            </TableCell>
                            <TableCell className="px-10" align="center">
                              {totalInLocation + inboundToLocation}
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
