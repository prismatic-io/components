import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/http";
import { destroy, identify, track, trackPageView, rawRequest } from "./actions";
import connections from "./connections";

export default component({
  key: "customer-io",
  documentationUrl: "https://prismatic.io/docs/components/customer-io/",
  public: true,
  display: {
    label: "Customer.io",
    category: "Application Connectors",
    description:
      "Identify and delete Customer.io customers, and track customer events and page views.",
    iconPath: "icon.png",
  },
  actions: { destroy, identify, track, trackPageView, rawRequest },
  connections,
  hooks: { error: handleErrors },
});
