import React, { useState } from "react";
import {
  Grid,
  FormGroup,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from "@material-ui/core";
import { withLayout } from "../src/layout/Layout";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import appConfig from "../config/appConfig";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import { Formik, Field } from "formik";
import MaterialTable from "material-table";
// import { DownloadExcel } from "../src/services/ExcelService";

function index(props) {
  const [groupSummaryReport, setGroupSummaryReport] = useState([]);

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item md={12} xs={12}>
          <ExpansionPanel square defaultExpanded={true}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Filtreler</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Formik
                initialValues={{
                  startDate: new Date(new Date().getFullYear(), new Date().getUTCMonth(), 1),
                  endDate: new Date(new Date().getFullYear(), new Date().getUTCMonth() + 1, 0),
                  // customer: customerInitialState,
                }}
                validateOnChange={false}
                validate={(values) => {
                  const errors = {};

                  return errors;
                }}
                onSubmit={(values, actions) => {
                  actions.setValues(values);
                  axios
                    .post(
                      appConfig.baseApiUrl + "report/GetGroupSummaryReport",
                      values
                    )
                    .then((resJson) => {
                      setGroupSummaryReport(resJson.data);
                      // alertify.success("Liste Güncellendi!");
                    });
                }}
              >
                {(formProps) => (
                  <form onSubmit={formProps.handleSubmit}>
                    <FormGroup>
                      <Field name={"startDate"} id={"startDate"}>
                        {({ field: { value }, form: { setFieldValue } }) => (
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              name="startDate"
                              label="İşlem Tarihi"
                              format="dd/MM/yyyy"
                              value={value}
                              onChange={(val) => {
                                setFieldValue("startDate", val);
                              }}
                              okLabel="Seç"
                              cancelLabel="İptal"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </Field>
                      <Field name={"endDate"} id={"endDate"}>
                        {({ field: { value }, form: { setFieldValue } }) => (
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              name="endDate"
                              label="İşlem Tarihi"
                              format="dd/MM/yyyy"
                              value={value}
                              onChange={(val) => {
                                setFieldValue("endDate", val);
                              }}
                              okLabel="Seç"
                              cancelLabel="İptal"
                              KeyboardButtonProps={{
                                "aria-label": "change date",
                              }}
                            />
                          </MuiPickersUtilsProvider>
                        )}
                      </Field>
                      <Button color="primary" type="submit">
                        Göster
                      </Button>
                    </FormGroup>
                  </form>
                )}
              </Formik>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        <Grid item md={12} xs={12}>
          <MaterialTable
            title="Grup Özet"
            columns={[
              { title: "Grup", field: "groupName" },
              { title: "Döviz", field: "currencyCode" },
              { title: "Toplam Kâr", field: "totalProfit" },
              { title: "Toplam Bakiye", field: "totalBalance" },
              { title: "Havuz Kârı", field: "poolProfit" },
            ]}
            data={groupSummaryReport}
            options={{
              actionsColumnIndex: -1,
              exportButton: true,
              exportCsv: (columns, data) => {
                // DownloadExcel("Grup Özet", columns, data);
              },
              pageSize: 20,
              pageSizeOptions: [20, 30, 40],
            }}
            localization={{
              pagination: {
                labelDisplayedRows: "{from}-{to} of {count}",
              },
              header: {
                actions: "İşlemler",
              },
              body: {
                emptyDataSourceMessage: "No records to display",
                filterRow: {
                  filterTooltip: "Filter",
                },
              },
              toolbar: {
                // showColumnsTitle?: string;
                // showColumnsAriaLabel?: string;
                exportTitle: "Dosyaya Aktar",
                // exportAriaLabel?: string;
                exportName: "Excel'e Aktar",
                searchTooltip: "Ara",
                searchPlaceholder: "Aranacak kelimeyi giriniz",
              },
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
export default withLayout(index);