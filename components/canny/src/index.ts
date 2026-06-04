import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions";
import connections from "./connections";
import dataSources from "./dataSources";
import triggers from "./triggers";

export default component({
  key: "canny",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/canny/",
  display: {
    label: "Canny",
    description:
      "Interact with the Canny API to manage feedback boards, posts, votes, comments, and users.",
    iconPath: "icon.png",
    category: "Application Connectors",
  },
  hooks: {
    error: handleErrors,
  },
  actions,
  connections,
  triggers,
  dataSources,
});
