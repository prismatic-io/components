import { connection } from "@prismatic-io/spectral";

export const odooBasicAuth = connection({
  key: "odooBasicAuth",
  display: {
    label: "Basic Authentication (Deprecated)",
    description:
      "Authenticate using a username and password against Odoo's XML-RPC API. Maintained for backwards compatibility with existing integrations. Odoo will drop XML-RPC support in 19.1 (mid-2026); use the API Key connection for new integrations.",
  },
  inputs: {
    baseUrl: {
      label: "Odoo Base URL",
      type: "string",
      required: true,
      example: "https://yourdomain.odoo.com",
      comments: "The URL used to log in to the Odoo instance.",
    },
    port: {
      label: "Server Port",
      type: "string",
      required: false,
      example: "443",
      comments:
        "The port to connect on. Leave blank to use the default HTTP (80) or HTTPS (443) port.",
    },
    db: {
      label: "Odoo Database Name",
      type: "string",
      required: true,
      example: "odoo_db",
      comments:
        "The name of the Odoo database to connect to. Found in Odoo by clicking the user icon at the top-right and selecting 'My Databases'.",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      example: "john.doe@example.com",
      comments: "The username used to log in to the Odoo instance.",
    },
    password: {
      label: "Password or API Key",
      type: "password",
      required: true,
      comments:
        "The password or API key used to authenticate the user against the Odoo XML-RPC API.",
    },
  },
});
