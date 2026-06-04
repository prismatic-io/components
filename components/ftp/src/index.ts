import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import triggers from "./triggers";

export default component({
  key: "ftp",
  documentationUrl: "https://prismatic.io/docs/components/ftp/",
  public: true,
  display: {
    label: "FTP",
    description: "Manage files and directories on an FTP server",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  triggers,
  connections,
});
