import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions/index";
import connections from "./connections";

export default component({
  key: "snowflake",
  public: true,
  display: {
    label: "Snowflake",
    description: "Execute SQL queries and manage statements in Snowflake.",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  connections,
  hooks: {
    error: handleErrors,
  },
  documentationUrl: "https://prismatic.io/docs/components/snowflake/",
});
