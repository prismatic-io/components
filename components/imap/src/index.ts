import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import dataSources from "./dataSources";
import triggers from "./triggers";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

import connections from "./connections";

export default component({
  key: "imap",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/imap/",
  display: {
    category: "Application Connectors",
    label: "IMAP",
    description: "Interact with your IMAP email account",
    iconPath: "icon.png",
  },
  hooks: { error: handleErrors },
  actions,
  triggers,
  dataSources,
  connections,
});
