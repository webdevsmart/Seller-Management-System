import React from "react";
import IconButton from "@material-ui/core/IconButton";
import {  Icon, Tooltip } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarStyles = {
  iconButton: {
  },
};

class CustomToolbar extends React.Component {
  state = {
      isAll: false,
  }

  handleAction = () => {
    let {isAll} = this.state;
    this.props.handleClick(isAll);
    this.setState({isAll: !isAll});
  }
  render() {
    const { classes } = this.props;

    let { isAll } = this.state;

    return (
      <React.Fragment>
        {
            isAll == false && (
                <Tooltip title={"Show only selected rows"}>
                    <IconButton className={classes.iconButton} onClick={this.handleAction}>
                        <Icon>radio_button_checked</Icon>
                    </IconButton>
                </Tooltip>
            )
        }
        {
            isAll == true && (
                <Tooltip title={"Show all rows"}>
                    <IconButton className={classes.iconButton} onClick={this.handleAction}>
                        <Icon>radio_button_unchecked</Icon>
                    </IconButton>
                </Tooltip>
            )
        }
      </React.Fragment>
    );
  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);