import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { destroy, identify, track, trackPageView, rawRequest } from "./actions";
import connections from "./connections";

export default component({
  key: "customer-io",
  documentationUrl: "https://prismatic.io/docs/components/customer-io/",
  public: true,
  display: {
    label: "Customer.io",
    category: "Application Connectors",
    description: "Manage customers on the Customer.io platform.",
    iconPath: "icon.png",
  },
  actions: { destroy, identify, track, trackPageView, rawRequest },
  connections,
  hooks: { error: handleErrors },
});
