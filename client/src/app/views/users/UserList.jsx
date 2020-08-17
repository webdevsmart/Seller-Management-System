import React, { Component } from "react";
import {
  IconButton,
  Icon,
  Button,
  Card
} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import { Breadcrumb, ConfirmationDialog } from "egret";
import UserEditorDialog from "./UserEditorDialog";
import { getAllUsers, deleteUser } from "./UserService";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";

const options = {
  filterType: 'checkbox',
  customToolbarSelect: () => {},
  selectableRows: "none"
};

class UserList extends Component {
  state = {
    userList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    warningOpen: false,
    warningMessage: "",
  };

  setPage = page => {
    this.setState({ page });
  };

  setRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  handleDialogClose = () => {
    this.setState({
      shouldOpenEditorDialog: false,
      shouldOpenConfirmationDialog: false
    });
    this.updatePageData();
  };

  handleDeleteUser = mid => {
    this.setState({
      mid,
      shouldOpenConfirmationDialog: true
    });
  };

  handleConfirmationResponse = () => {
    deleteUser(this.state.mid).then((res) => {
      this.handleDialogClose();
    }).catch((error) => {
      this.setState({warningMessage: error.response.data.message});
      this.setState({warningOpen: true});
      this.handleDialogClose();
    });
  };

  componentDidMount() {
    this.updatePageData();
  }

  updatePageData = () => {
    getAllUsers().then((res) => {
      let tmpList = [];
      res.data.map((item) => {
        tmpList.push({email: item.email, name: item.name, mid: item._id});
      });
      this.setState({ userList: tmpList });
    });
  };

  closeWarningMessage = () => {
    this.setState({warningOpen: false});
  }

  render() {
    let {
      userList,
      shouldOpenConfirmationDialog,
      shouldOpenEditorDialog,
      warningOpen,
      warningMessage
    } = this.state;
    
    const columns = [
      {
      name: "email",
      label: "Email Address",
      options: {
        filter: true,
        sort: true,
      }
      },
      {
      name: "name",
      label: "User Name",
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
                  this.setState({
                    mid: this.state.userList[dataIndex].mid,
                    shouldOpenEditorDialog: true
                  })
                }
              >
                <Icon color="primary">edit</Icon>
              </IconButton>  
              <IconButton onClick={() => this.handleDeleteUser(this.state.userList[dataIndex].mid)}>
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
          <Breadcrumb routeSegments={[{ name: "Supplier Type" }]} />
        </div>

        <Button
          className="mb-16"
          variant="contained"
          color="primary"
          onClick={() => this.setState({ shouldOpenEditorDialog: true, mid: null })}
        >
          Add New User
        </Button>
        <Card className="w-100 overflow-auto" elevation={6}>
          <MUIDataTable
            className="p-10"
            title={"User List"}
            data={userList}
            columns={columns}
            options={options}
          />
          {shouldOpenEditorDialog && (
            <UserEditorDialog
              handleClose={this.handleDialogClose}
              open={shouldOpenEditorDialog}
              mid={this.state.mid}
            />
          )}

          {shouldOpenConfirmationDialog && (
            <ConfirmationDialog
              open={shouldOpenConfirmationDialog}
              onConfirmDialogClose={this.handleDialogClose}
              onYesClick={this.handleConfirmationResponse}
              text="Are you sure to delete?"
            />
          )}
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right"
          }}
          open={warningOpen}
          autoHideDuration={6000}
          onClose={this.closeWarningMessage}
        >
          <MySnackbarContentWrapper
            onClose={this.closeWarningMessage}
            variant="warning"
            message={warningMessage}
          />
        </Snackbar>
      </div>
    );
  }
}

export default UserList;
