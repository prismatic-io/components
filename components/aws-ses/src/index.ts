import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";

export default component({
  key: "aws-ses",
  documentationUrl: "https://prismatic.io/docs/components/aws-ses/",
  public: true,
  display: {
    label: "Amazon SES",
    description:
      "Send emails and list verified identities with Amazon Simple Email Service (SES).",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  actions,
  dataSources,
  connections,
});
