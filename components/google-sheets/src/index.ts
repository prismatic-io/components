import { component } from "@prismatic-io/spectral";
import addSheet from "./actions/addSheet";
import appendRows from "./actions/appendRows";
import clearSheet from "./actions/clearSheet";
import createDocument from "./actions/createDocument";
import getRows from "./actions/listRows";
import listSheets from "./actions/listSheets";
import removeSheet from "./actions/removeSheet";
import setHeaderRow from "./actions/setHeaderRow";
import updateRows from "./actions/updateRows";
import rawRequest from "./actions/rawRequest";
import connections from "./connections";
import dataSources from "./dataSources";
import listColumns from "./actions/listColumns";
import triggers from "./triggers";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "google-sheets",
  documentationUrl: "https://prismatic.io/docs/components/google-sheets/",
  public: true,
  display: {
    label: "Google Sheets",
    description: "Manage spreadsheets, sheets, and rows in Google Sheets.",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions: {
    addSheet,
    appendRows,
    clearSheet,
    createDocument,
    getRows,
    listColumns,
    listSheets,
    removeSheet,
    setHeaderRow,
    updateRows,
    rawRequest,
  },
  dataSources,
  connections,
  triggers,
  hooks: { error: handleErrors },
});
