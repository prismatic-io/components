import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
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
      "Manage Microsoft Intune users, groups, managed devices, mobile apps, device compliance policies, and change notification subscriptions.",
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
