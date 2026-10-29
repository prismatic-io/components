import { component } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import actions from "./actions/index";
import connections from "./connections";

export default component({
  key: "aspose",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/aspose/",
  display: {
    category: "Application Connectors",
    label: "Aspose",
    description: "Convert and manipulate documents and PDFs in Aspose.",
    iconPath: "icon.png",
  },
  actions,
  connections,
  hooks: {
    error: handleErrors,
  },
});
