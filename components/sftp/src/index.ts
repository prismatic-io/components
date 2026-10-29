import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import connections from "./connections";
import triggers from "./triggers";

export default component({
  key: "sftp",
  documentationUrl: "https://prismatic.io/docs/components/sftp/",
  public: true,
  display: {
    label: "SFTP",
    description: "Read, write, move and delete files on an SFTP server",
    iconPath: "icon.png",
    category: "Data Platforms",
  },
  actions,
  triggers,
  connections,
});
