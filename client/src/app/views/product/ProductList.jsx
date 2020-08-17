import React, { Component } from "react";
import axios from 'axios';
import {
  IconButton,
  Icon,
  Button,
  Card,
  Avatar,
  TableCell
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";
import { Breadcrumb, ConfirmationDialog } from "egret";
import { Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "./ProductService";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const options = {
  filterType: 'checkbox',
  customToolbarSelect: () => {},
  selectableRows: "none",
};

const columnStyleWithWidth = {
  width: "100px"
}

class ProductList extends Component {
  state = {
    productList: [],
    shouldOpenConfirmationDialog: false,
    warningOpen: false,
    warningMessage: "",
    lightboxOpen: false,
    lightboxImg: null,
  };

  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false
    });
    this.updatePageData();
  };

  handleDeleteProduct = mid => {
    this.setState({
      mid,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = () => {
    deleteProduct(this.state.mid).then((res) => {
      this.handleDialogClose();
    });
  };

  componentDidMount() {

    this.updatePageData();
  }

  updatePageData = () => {
    getAllProducts().then((res) => {
      let tmpList = [];
      res.data.map((item) => {
        tmpList.push({
          ...item,
          parent: item.parent_category.category,
          categories: item.categories.map(a => a.category).join(),
        });
      });
      this.setState({ productList: tmpList });
    });
  };

  handleClickAvatar = (img) => {
    this.setState({ lightboxImg: img, lightboxOpen: true })
  }
  
  getMuiTheme = () => createMuiTheme({
    overrides: {
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
      productList,
      shouldOpenConfirmationDialog,
      warningOpen,
      warningMessage,
      lightboxOpen,
      lightboxImg,
    } = this.state;
    
    const columns = [
      {
        name: "",
        label: "",
        options: {
          filter: false,
          sort: false,
          empty: true,
          customHeadRender: ({index, ...column}) => {
            return (
              <TableCell key={index} style={columnStyleWithWidth}>
                  {column.label}
              </TableCell>
            )
          },
          customBodyRenderLite: (dataIndex) => {
            return (
              <a href="#!" onClick={() => this.handleClickAvatar(this.state.productList[dataIndex].img)}>
                <Avatar
                  className="avatar"
                  src={`/${this.state.productList[dataIndex].img}`}
                />
              </a>
            );
          }
        }
      },
      {
        name: "sku",
        label: "SKU",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "upc",
        label: "UPC",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "name",
        label: "Name",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "parent",
        label: "Parent",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "categories",
        label: "Categories",
        options: {
          filter: true,
          sort: true,
        }
      },
      {
        name: "notes",
        label: "Notes",
        options: {
          filter: true,
          sort: true,
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
                  this.props.history.push(`/product/edit/${productList[dataIndex]._id}`)
                }
              >
                <Icon color="primary">edit</Icon>
              </IconButton>  
              <IconButton onClick={() => this.handleDeleteProduct(this.state.productList[dataIndex]._id)}>
                <Icon color="error">delete</Icon>
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
          <Breadcrumb routeSegments={[{ name: "Product List" }]} />
        </div>

        <Link to="/product/add-new">
          <Button
            className="mb-16"
            variant="contained"
            color="primary"
          >
            Add New Product
          </Button>
        </Link>
        <Card className="w-100 overflow-auto" elevation={6}>
          <MuiThemeProvider theme={this.getMuiTheme()}>
            <MUIDataTable
              className="crud-table"
              title={"Product List"}
              data={productList}
              columns={columns}
              options={options}
            />
          </MuiThemeProvider>

          {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={this.handleDialogClose}
              onYesClick={this.handleConfirmationResponse}
              text="Are you sure to delete?"
            />
          )}
          
        </Card>
        { lightboxOpen && lightboxImg && (
          <Lightbox
            mainSrc={`/${lightboxImg}`}
            onCloseRequest={() => this.setState({ lightboxImg: null,lightboxOpen: false })}
          />
        )}

      </div>
    );
  }
}

export default ProductList;
