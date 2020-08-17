import React, { Component } from "react";
import {
  Icon,
  IconButton,
  Badge,
  Hidden,
  withStyles,
  MuiThemeProvider,
  MenuItem
} from "@material-ui/core";
import { EgretMenu, EgretToolbarMenu, EgretSearchBox } from "egret";
import { setLayoutSettings } from "app/redux/actions/LayoutActions";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import NotificationBar from "../SharedCompoents/NotificationBar";
import ShoppingCart from "../SharedCompoents/ShoppingCart";

class Layout2Topbar extends Component {
  state = {};

  handleSignOut = () => {};

  updateSidebarMode = sidebarSettings => {
    let { settings, setLayoutSettings } = this.props;

    setLayoutSettings({
      ...settings,
      layout2Settings: {
        ...settings.layout2Settings,
        leftSidebar: {
          ...settings.layout2Settings.leftSidebar,
          ...sidebarSettings
        }
      }
    });
  };

  handleSidebarToggle = () => {
    let { settings } = this.props;
    let { layout2Settings } = settings;

    let mode =
      layout2Settings.leftSidebar.mode === "close" ? "mobile" : "close";

    this.updateSidebarMode({ mode });
  };

  render() {
    let { theme, settings } = this.props;
    const topbarTheme =
      settings.themes[settings.layout2Settings.topbar.theme] || theme;
    return (
      <MuiThemeProvider theme={topbarTheme}>
        <Helmet>
          <style>
            {`.topbar {
              background-color: ${topbarTheme.palette.primary.main};
              border-color: ${topbarTheme.palette.divider} !important;
            }
            .topbar .brand__text {
              color: ${topbarTheme.palette.primary.contrastText};
            }
            `}
          </style>
        </Helmet>

        <div className="topbar">
          <div className="flex flex-space-between flex-middle container h-100">
            <div className="flex flex-middle brand">
              <img src="/assets/images/logo.svg" alt="company-logo" />
              <span className="brand__text">Egret</span>
            </div>
            <div className="mx-auto"></div>
            <div className="flex flex-middle">
              <EgretToolbarMenu offsetTop="80px">
                <EgretSearchBox />

                <NotificationBar />

                <ShoppingCart/>

                <EgretMenu
                  menuButton={
                    <img
                      className="mx-8 text-middle circular-image-small cursor-pointer"
                      src="/assets/images/face-7.jpg"
                      alt="user"
                    />
                  }
                >
                  <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> home </Icon>
                    <span className="pl-16"> Home </span>
                  </MenuItem>
                  <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> person </Icon>
                    <span className="pl-16"> Person </span>
                  </MenuItem>
                  <MenuItem
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> settings </Icon>
                    <span className="pl-16"> Settings </span>
                  </MenuItem>
                  <MenuItem
                    onClick={this.handleSignOut}
                    className="flex flex-middle"
                    style={{ minWidth: 185 }}
                  >
                    <Icon> power_settings_new </Icon>
                    <span className="pl-16"> Logout </span>
                  </MenuItem>
                </EgretMenu>
              </EgretToolbarMenu>

              <Hidden mdUp>
                <IconButton onClick={this.handleSidebarToggle}>
                  <Icon>menu</Icon>
                </IconButton>
              </Hidden>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

Layout2Topbar.propTypes = {
  setLayoutSettings: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  setLayoutSettings: PropTypes.func.isRequired,
  settings: state.layout.settings
});

export default withStyles({}, { withTheme: true })(
  connect(
    mapStateToProps,
    { setLayoutSettings }
  )(Layout2Topbar)
);
