import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "toast",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/toast/",
  display: {
    label: "Toast",
    description:
      "Manage Toast restaurant employees, jobs, shifts, time entries, cash entries, and deposits, and react to Toast events with webhook and polling triggers.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: {
    error: handleErrors,
  },
  actions,
  triggers,
  dataSources,
  connections,
});
