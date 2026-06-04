import { component } from "@prismatic-io/spectral";
import { query } from "./actions";
import connections from "./connections";
import triggers from "./triggers";

export default component({
  key: "postgres",
  documentationUrl: "https://prismatic.io/docs/components/postgres/",
  public: true,
  display: {
    label: "PostgreSQL",
    description: "Query and manage data in a PostgreSQL database",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions: { query },
  connections,
  triggers,
});
