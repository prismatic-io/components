import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/http";
import dataSources from "./dataSources";

export default component({
  key: "ms-excel",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-excel/",
  display: {
    category: "Data Platforms",
    label: "Microsoft Excel",
    description:
      "Manage workbooks, worksheets, tables, rows, columns, and cell ranges in Excel files on OneDrive and SharePoint via Microsoft Graph, and parse or build .xlsx files.",
    iconPath: "icon.png",
  },
  actions,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
