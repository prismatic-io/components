import { connection } from "@prismatic-io/spectral";

export const odooApiKey = connection({
  key: "odooApiKey",
  display: {
    label: "API Key",
    description: "Authenticate requests to Odoo using an API key.",
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
    apiKey: {
      label: "API Key",
      type: "password",
      required: true,
      comments:
        "The API key used to authenticate requests. In Odoo, open the profile menu, then Account Security, and create a new API Key. Requires Odoo 19.0 or later.",
    },
  },
});
