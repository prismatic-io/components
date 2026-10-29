import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "ms-intune",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/ms-intune/",
  display: {
    label: "Microsoft Intune",
    description:
      "Use the Microsoft Intune component to manage users, devices, and applications.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: {
    error: handleErrors,
  },
  actions,
  connections,
  dataSources,
  triggers,
});
