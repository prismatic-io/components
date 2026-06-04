import { component } from "@prismatic-io/spectral";
import actions from "./actions";
import { smtpConnection } from "./connections";

export default component({
  key: "smtp",
  public: true,
  documentationUrl: "https://prismatic.io/docs/components/smtp/",
  display: {
    category: "Application Connectors",
    label: "SMTP",
    description: "Send emails through an SMTP server",
    iconPath: "icon.png",
  },
  actions,
  connections: [smtpConnection],
});
