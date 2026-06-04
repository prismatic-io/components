import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import triggers from "./triggers";
import connections from "./connections";
import actions from "./actions";
import dataSources from "./dataSources";

export default component({
  key: "stripe",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/stripe/",
  display: {
    label: "Stripe",
    description:
      "Manage payments, customers, subscriptions, and other objects in your Stripe account.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
  dataSources,
  hooks: { error: handleErrors },
});
