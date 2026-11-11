import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import createDataset from "./actions/createDataset";
import createRow from "./actions/createRow";
import deleteRows from "./actions/deleteRows";
import listDatasets from "./actions/listDatasets";
import listGroups from "./actions/listGroups";
import listReports from "./actions/listReports";
import listTables from "./actions/listTables";
import rawRequest from "./actions/rawRequest";
import updateTable from "./actions/updateTable";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "ms-power-bi",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-power-bi/",
  display: {
    label: "Microsoft Power BI",
    category: "Application Connectors",
    description: "Manage Power BI datasets, tables, and rows, list groups and reports, and react to new records.",
    iconPath: "icon.png",
  },
  actions: {
    listGroups,
    listDatasets,
    listReports,
    listTables,
    createDataset,
    createRow,
    updateTable,
    deleteRows,
    rawRequest,
  },
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
