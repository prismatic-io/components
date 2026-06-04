import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import triggers from "./triggers";
import connections from "./connections";

export default component({
  key: "first-resonance",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/first-resonance/",
  display: {
    label: "First Resonance ION",
    description:
      "Manage purchase orders and manufacturing data in First Resonance ION.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  triggers,
  connections,
});
