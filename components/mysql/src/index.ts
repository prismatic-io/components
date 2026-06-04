import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";

export default component({
  key: "mysql",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/mysql/",
  display: {
    label: "MySQL",
    category: "Data Platforms",
    description: "Query and manage data in a MySQL Database",
    iconPath: "icon.png",
  },
  actions,
  connections,
});
