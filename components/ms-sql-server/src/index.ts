import { component } from "@prismatic-io/spectral";
import { execute, query } from "./actions";
import connections from "./connections";

export default component({
  key: "ms-sql-server",
  documentationUrl: "https://prismatic.io/docs/components/ms-sql-server/",
  public: true,
  display: {
    label: "Microsoft SQL Server",
    description:
      "Query and manage data in a Microsoft SQL Server (MSSQL) database.",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions: { query, execute },
  connections,
});
