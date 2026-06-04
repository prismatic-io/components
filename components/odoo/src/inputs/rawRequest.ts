import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection, model } from "./common";

const { debugRequest: _debug, ...rawHttpRequestBase } = httpClientInputs;

export const rawHttpRequestInputs = {
  connection,
  ...rawHttpRequestBase,
  url: {
    ...rawHttpRequestBase.url,
    comments:
      "The path portion of the URL to call. The connection's base URL (for example, `https://yourdomain.odoo.com`) is prepended automatically. For example, to call `https://yourdomain.odoo.com/json/2/res.partner/search_read`, enter only `/json/2/res.partner/search_read`.",
    example: "/json/2/res.partner/search_read",
  },
};

const method = input({
  label: "Method",
  type: "string",
  required: true,
  comments:
    "The Odoo model method to invoke via `execute_kw` (for example, `search_read`, `create`, `write`).",
  example: "search_read",
  placeholder: "Enter the method to execute",
  clean: util.types.toString,
});

const parameters = input({
  label: "Parameters",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify([["read"]]),
  clean: util.types.toObject,
  comments:
    "A JSON array of positional arguments to pass to `execute_kw`. See the Odoo XML-RPC documentation for argument shapes.",
  example: JSON.stringify([["read"]]),
});

export const rawRequestInputs = {
  connection,
  model,
  method,
  parameters,
};
