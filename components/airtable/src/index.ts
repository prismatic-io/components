import { component } from "@prismatic-io/spectral";
import connections from "./connections";
import actions from "./actions";
import dataSources from "./dataSources";
import triggers from "./triggers";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export default component({
  key: "airtable",
  documentationUrl: "https://prismatic.io/docs/components/airtable/",
  public: true,
  display: {
    label: "Airtable",
    description: "Manage records, tables, and bases in Airtable.",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  connections,
  dataSources,
  triggers,
  hooks: { error: handleErrors },
});
