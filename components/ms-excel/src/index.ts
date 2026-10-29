import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import dataSources from "./dataSources";

export default component({
  key: "ms-excel",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-excel/",
  display: {
    category: "Data Platforms",
    label: "Microsoft Excel",
    description: "Parse and build .xlsx files (spreadsheets)",
    iconPath: "icon.png",
  },
  actions,
  connections,
  dataSources,
  hooks: {
    error: handleErrors,
  },
});
