import React, { Component, Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// import { navigations } from "../../navigations";
import { EgretVerticalNav } from "egret";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";

class Sidenav extends Component {
  state = {
    navigations: [
      {
        name: "Product",
        icon: "shopping_basket",
        path: "/product/list",
        permission: "product",
      },
      {
        name: "Product Cost List",
        icon: "format_list_bulleted",
        path: "/product-cost/list",
        permission: "product_cost",
      },
      {
        name: "Product Category",
        icon: "category",
        path: "/product-category/list",
        permission: "product_category",
      },
      {
        name: "Supplier",
        icon: "group_work",
        path: "/supplier/list",
        permission: "supplier",
      },
      {
        name: "Parts",
        icon: "inbox",
        path: "/parts/list",
        permission: "parts",
      },
      {
        name: "Settings",
        icon: "dashboard",
        children: [
          {
            name: "Product Variations",
            iconText: "V",
            path: "/product-variation/list",
            permission: "product_variation",
          },
          {
            name: "Parts UM",
            iconText: "U",
            path: "/parts-um/list",
            permission: "parts_um",
          },
          {
            name: "Parts Type",
            iconText: "T",
            path: "/parts-type/list",
            permission: "parts_type",
          },
          {
            name: "Supplier Type",
            iconText: "T",
            path: "/supplier-type/list",
            permission: "supplier_type",
          },
          {
            name: "Freight",
            iconText: "F",
            path: "/freight/list",
            permission: "freight",
          },
          {
            name: "Storage",
            iconText: "S",
            path: "/storage/list",
            permission: "storage",
          },
          {
            name: "Fullfillment",
            iconText: "F",
            path: "/fullfillment/list",
            permission: "fullfillment",
          },
          {
            name: "Misc",
            iconText: "M",
            path: "/misc/list",
            permission: "misc",
          },
          {
            name: "Users",
            iconText: "U",
            path: "/users/list",
            permission: "users",
          },
        ]
      },
      {
        name: "Inventory Warehouse",
        icon: "favorite",
        path: "/inventory-warehouse/add",
        permission: "inventory_warehouse"
      },
      {
        name: "Warehouse Location Types",
        iconText: "W",
        path: "/warehouse-location-type/list",
        permission: "warehouse_location_type"
      },
      {
        name: "Warehouse Locations",
        iconText: "I",
        path: "/inventory-warehouse-location/list",
        permission: "inventory_warehouse_location"
      },
    ],
  };

  componentDidMount() {
    let {navigations} = this.state;
    let tempNav = [];
    let permissions = JSON.parse(localStorage.getItem('auth_user')).permissions;
    let role = JSON.parse(localStorage.getItem('auth_user')).role;
    if (role != "ADMIN") {
      navigations.map((nav) => {
        if (nav.children && nav.children.length > 0) {
          let tempChildNavs = [];
          nav.children.map((childNav) =>  {
            if (permissions.includes(childNav.permission)) {
              tempChildNavs.push(childNav);
            }
          });
          if (tempChildNavs.length > 0) {
            tempNav.push({name: nav.name, icon: nav.icon, children: tempChildNavs});
          }
        }
        else {
          if (permissions.includes(nav.permission)) {
            tempNav.push(nav);
          }
        }
      });
      this.setState({navigations: tempNav});
    }
  }

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;
    let activeLayoutSettingsName = settings.activeLayout+"Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    setLayoutSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  renderOverlay = () => (
    <div
      onClick={() => this.updateSidebarMode({ mode: "close" })}
      className="sidenav__overlay"
    />
  );
  render() {
    let {navigations} = this.state;
    return (
      <Fragment>
        <Scrollbar option={{suppressScrollX: true}} className="scrollable position-relative">
          {this.props.children}
          {
            navigations && (
              <EgretVerticalNav navigation={navigations} />
            )
          }
        </Scrollbar>
        {this.renderOverlay()}
      </Fragment>
    );
  }
}
Sidenav.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});
export default withRouter(
  connect(
    mapStateToProps,
    {
      setLayoutSettings
    }
  )(Sidenav)
);