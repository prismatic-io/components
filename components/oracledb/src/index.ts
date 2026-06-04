import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";

export default component({
  key: "oracledb",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/oracledb/",
  display: {
    label: "Oracle Database",
    description: "Query and manage data in an OracleDB database",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  connections,
});
