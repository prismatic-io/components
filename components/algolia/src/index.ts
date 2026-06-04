import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { browseIndex } from "./actions/browseIndex";
import indexes from "./actions/index";
import rawRequest from "./actions/rawRequest";
import { getIndex, searchMultipleIndices } from "./actions/searchActions";
import { searchFacetValues } from "./actions/searchFacetValues";
import settings from "./actions/settings";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "algolia",
  documentationUrl: "https://prismatic.io/docs/components/algolia/",
  public: true,
  display: {
    label: "Algolia",
    category: "Application Connectors",
    description: "Manage search indexes, records, and settings in Algolia.",
    iconPath: "icon.png",
  },
  actions: {
    getIndex,
    searchMultipleIndices,
    rawRequest,
    searchFacetValues,
    browseIndex,
    ...settings,
    ...indexes,
  },
  triggers,
  dataSources,
  connections,
  hooks: {
    error: handleErrors,
  },
});
