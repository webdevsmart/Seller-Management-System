import React, { Component } from "react";
import { IconButton, Icon, Button, Card } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import Snackbar from "@material-ui/core/Snackbar";
import { Breadcrumb, ConfirmationDialog } from "egret";
import MySnackbarContentWrapper from "../../components/Snackbar/Snackbar";
import { getReportList, deleteReport } from "./ReportService";
import { Link } from "react-router-dom";

const options = {
  filterType: "checkbox",
  customToolbarSelect: () => {},
  selectableRows: "none",
};

class ReportList extends Component {
  state = {
    reportList: [],
    shouldOpenEditorDialog: false,
    shouldOpenConfirmationDialog: false,
    warningOpen: false,
    warningMessage: "",
  };

  componentDidMount() {
    this.updatePageData();
  }

  updatePageData = () => {
    getReportList().then((res) => {
      this.setState({reportList: res.data});
    });
  }

  closeWarningMessage = () => {
    this.setState({ warningOpen: false });
  };

  handleDeleteReport = (index) => {
    let {reportList} = this.state;
    deleteReport(reportList[index]._id).then(res => {
      this.updatePageData();
    });
    
  }

  render() {
    let {
      reportList,
      warningMessage,
      warningOpen,
    } = this.state;

    const columns = [
      {
        name: "submitted_datetime",
        label: "Date / Time Submitted",
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: "report_id",
        label: "Report ID",
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: "user",
        label: "User",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "report_type",
        label: "Report Type",
        options: {
          filter: true,
          sort: true,
        },
      },
      {
        name: "editted_date",
        label: "Date Last Edited",
        options: {
          filter: false,
          sort: true,
        },
      },
      {
        name: "editted_user",
        label: "User Who Edited",
        options: {
          filter: true,
          sort: true,
        },
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
                {
                  this.state.reportList[dataIndex] && this.state.reportList[dataIndex].report_type === "Inventory Warehouse" && (
                    <Link to={`/reports/inventory-warehouse-report/${this.state.reportList[dataIndex].model_id}`}>
                      <IconButton>
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                    </Link>
                  )
                }
                {
                  this.state.reportList[dataIndex] && this.state.reportList[dataIndex].report_type === "Sales" && (
                    <Link to={`/reports/sales-report/${this.state.reportList[dataIndex].model_id}`}>
                      <IconButton>
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                    </Link>
                  )
                }
                {
                  this.state.reportList[dataIndex] && this.state.reportList[dataIndex].report_type === "Inventory Factory" && (
                    <Link to={`/reports/inventory-factory-report/${this.state.reportList[dataIndex].model_id}`}>
                      <IconButton>
                        <Icon color="primary">edit</Icon>
                      </IconButton>
                    </Link>
                  )
                }
                <IconButton onClick={() => this.handleDeleteReport(dataIndex)}>
                  <Icon color="error">delete</Icon>
                </IconButton>
              </>
            );
          },
        },
      },
    ];

    return (
      <div className="m-sm-30">
        <div className="mb-sm-30">
          <Breadcrumb routeSegments={[{ name: "Manage Reports" }]} />
        </div>
        <Card className="w-100 overflow-auto" elevation={6}>
          <MUIDataTable
            className="pl-24 pr-24"
            title={"Report List"}
            data={reportList}
            columns={columns}
            options={options}
          />
        </Card>
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
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

export default ReportList;
