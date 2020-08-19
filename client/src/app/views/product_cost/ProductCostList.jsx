import React, { Component } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Icon,
  Card
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { Breadcrumb } from "egret";
import { getAllProductCostList } from "./ProductCostService";
import { getAllMisc } from "../misc/MiscService";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const options = {
  filterType: 'checkbox',
  customToolbarSelect: () => {},
  selectableRows: "none",
};

class ProductCostList extends Component {
  state = {
    productCostList: [],
    miscList: [],
  };

  componentDidMount() {
    this.updatePageData();
  }

  updatePageData = () => {
    getAllMisc().then((res) => {
      this.setState({miscList: res.data});
    });
    getAllProductCostList().then((res) => {
      let amazonFeeMisc = this.state.miscList.find(o => o.name === 'Amazon Fee');
      let shopifyFeeMisc = this.state.miscList.find(o => o.name === 'Shopify Fees');
      amazonFeeMisc = amazonFeeMisc === undefined ? 0 : amazonFeeMisc.rate;
      shopifyFeeMisc = shopifyFeeMisc === undefined ? 0 : shopifyFeeMisc.rate;
      let tmpList = [];
      res.data.map((item) => {
        let oem = 0;
        item.parts.map((part, index) => {
          oem += parseFloat(part.cost_usd) * parseFloat(item.parts_qty[index])
        });
        let amazonFee = parseFloat(item.retail_price) * parseFloat(amazonFeeMisc / 100);
        let retailPrice = parseFloat(item.retail_price);
        let shopifyFee = parseFloat(item.retail_price) * parseFloat(shopifyFeeMisc / 100);
        let freight = parseFloat(item.freight.cost_usd) * parseFloat(item.freight_qty);
        let storage = parseFloat(item.storage.rate) * parseFloat(item.storage_duration);
        let amazonFeeCost = parseFloat(oem) + parseFloat(amazonFee) + freight + storage + parseFloat(item.fullfillment_fba_fee.rate);
        let shopifyFeeCost = oem + freight + storage + shopifyFee + parseFloat(item.fullfillment_fba_fee.rate);
        tmpList.push({
          _id: item._id,
          sku: item.sku,
          upc: item.upc,
          name: item.name,
          asin: item.asin,
          parent: item.parent_category.category,
          retailPrice: `$${retailPrice.toFixed(2)}`,
          oem: `$${oem.toFixed(2)}`,
          freight: `$${freight.toFixed(2)}`,
          storage: `$${storage.toFixed(2)}`,
          fullfillment: `$${parseFloat(item.fullfillment_fba_fee.rate).toFixed(2)}`,
          amazonFee: `$${amazonFee.toFixed(2)}`,
          amazonFeeCost: `$${amazonFeeCost.toFixed(2)}`,
          amazonFeeProfit: `$${parseFloat(retailPrice - amazonFeeCost).toFixed(2)}`,
          amazonFeeProfitPro: parseFloat((retailPrice - amazonFeeCost) / retailPrice * 100).toFixed(2) + '%',
          shopifyFee: `$${shopifyFee.toFixed(2)}`,
          shopifyFeeCost: `$${shopifyFeeCost.toFixed(2)}`,
          shopifyFeeProfit: `$${parseFloat(retailPrice - shopifyFeeCost).toFixed(2)}`,
          shopifyFeeProfitPro: parseFloat((retailPrice - shopifyFeeCost) / retailPrice * 100).toFixed(2) + '%',
        });
      });
      this.setState({ productCostList: tmpList });
    });
  };

  getMuiTheme = () => createMuiTheme({
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          // textAlign: 'center',
        }
      },
      MUIDataTableBodyRow: {
        root: {
          '&:nth-child(odd)': {
            backgroundColor: 'rgb(211 235 255 / 44%)'
          },
        }
      }
    }
  })
  

  render() {
    let {
      productCostList,
    } = this.state;
    
    const columns = [
      {
      name: "",
      label: "Product",
      options: {
        filter: true,
        sort: true,
        customHeadRender: ({index, ...column}) => {
          return (
            <TableCell key={index} style={{width: '400px'}}>
                {column.label}
            </TableCell>
          )
        },
        customBodyRenderLite: (dataIndex) => {
          return (
            <>
            <div className="flex flex-wrap">
              <p className="mr-10" style={{whiteSpace: 'nowrap'}}>
              <label className="font-weight-bold">SKU: </label>
              {this.state.productCostList[dataIndex].sku}
              </p>
              <p className="mr-10" style={{whiteSpace: 'nowrap'}}>
              <label className="font-weight-bold">Parent: </label>
              {this.state.productCostList[dataIndex].parent}
              </p>
              <p className="mr-10" style={{whiteSpace: 'nowrap'}}>
              <label className="font-weight-bold">UPC: </label>
              {this.state.productCostList[dataIndex].upc}
              </p>
            </div>
            <div className="flex flex-wrap">
              <p className="mr-10" style={{whiteSpace: 'nowrap'}}>
              <label className="font-weight-bold">Name: </label>
              {this.state.productCostList[dataIndex].name}
              </p>
              <p className="mr-10" style={{whiteSpace: 'nowrap'}}>
              <label className="font-weight-bold">ASIN: </label>
              {this.state.productCostList[dataIndex].asin}
              </p>
            </div>
            </>
          );
        }
      }
      },
      {
      name: "retailPrice",
      label: "Retail Price",
      options: {
        filter: false,
        sort: true,
      }
      },
      {
      name: "oem",
      label: "OEM",
      options: {
        filter: false,
        sort: true,
      }
      },
      {
      name: "freight",
      label: "Freight",
      options: {
        filter: false,
        sort: true,
      }
      },
      {
      name: "storage",
      label: "Storage",
      options: {
        filter: false,
        sort: true,
      }
      },
      {
      name: "fullfillment",
      label: "Fullfillment",
      options: {
        filter: false,
        sort: true,
      }
      },
      {
      name: "amazonFee",
      label: "Amazon Fee",
      options: {
        filter: false,
        sort: true,
        customHeadRender: ({index, ...column}) => {
          return (
          <>
            <TableCell key={index} style={{backgroundColor: '#f99090', textAlign: 'center'}}>
                {column.label}
            </TableCell>
          </>
          )
        },
      }
      },
      {
      name: "amazonFeeCost",
      label: "Cost",
      options: {
        filter: false,
        sort: true,
        customHeadRender: ({index, ...column}) => {
          return (
            <TableCell key={index} style={{backgroundColor: '#b9ecff', textAlign: 'center'}}>
                {column.label}
            </TableCell>
          )
        },
      }
      },
      {
      name: "amazonFeeProfit",
      label: "Profit",
      options: {
        filter: false,
        sort: true,
        customHeadRender: ({index, ...column}) => {
          return (
            <TableCell key={index} style={{backgroundColor: '#b9ecff', textAlign: 'center'}}>
                {column.label}
            </TableCell>
          )
        },
      }
      },
      {
      name: "amazonFeeProfitPro",
      label: "Profit %",
      options: {
        filter: false,
        sort: true,
        customHeadRender: ({index, ...column}) => {
          return (
            <TableCell key={index} style={{backgroundColor: '#b9ecff', textAlign: 'center'}}>
                {column.label}
            </TableCell>
          )
        },
      }
      },
      {
      name: "shopifyFee",
      label: "Shopify Fees",
      options: {
        filter: false,
        sort: true,
        customHeadRender: ({index, ...column}) => {
          return (
            <TableCell key={index} style={{backgroundColor: '#f99090', textAlign: 'center'}}>
                {column.label}
            </TableCell>
          )
        },
      }
      },
      {
      name: "shopifyFeeCost",
      label: "Cost",
      options: {
        filter: false,
        sort: true,
        customHeadRender: ({index, ...column}) => {
          return (
            <TableCell key={index} style={{backgroundColor: '#b9ecff', textAlign: 'center'}}>
                {column.label}
            </TableCell>
          )
        },
      }
      },
      {
      name: "shopifyFeeProfit",
      label: "Profit",
      options: {
        filter: false,
        sort: true,
        customHeadRender: ({index, ...column}) => {
          return (
            <TableCell key={index} style={{backgroundColor: '#b9ecff', textAlign: 'center'}}>
                {column.label}
            </TableCell>
          )
        },
      }
      },
      {
      name: "shopifyFeeProfitPro",
      label: "Profit %",
      options: {
        filter: false,
        sort: true,
        customHeadRender: ({index, ...column}) => {
          return (
            <TableCell key={index} style={{backgroundColor: '#b9ecff', textAlign: 'center'}}>
                {column.label}
            </TableCell>
          )
        },
      }
      },
      {
        name: "action",
        label: "Action",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customBodyRenderLite: (dataIndex) => {
            return (
              <>
              <IconButton
                onClick={() =>
                  this.props.history.push(`/product/edit/${productCostList[dataIndex]._id}`)
                }
              >
                <Icon color="primary">edit</Icon>
              </IconButton>  
              </>
            );
          }
        }
      },
    ];

    return (
      <div className="m-sm-30">
        <div  className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Supplier List" }]} />
        </div>
        <Card className="w-100 overflow-auto" elevation={6}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              className="crud-table"
              title={"Product Cost List"}
              data={productCostList}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>
        </Card>
      </div>
    );
  }
}

export default ProductCostList;
