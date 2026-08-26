import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { ApiPlane } from "../constants";
import { connection } from "./common";
const { debugRequest, ...rawRequestHttpInputs } = httpClientInputs;
const plane = input({
  label: "API Plane",
  type: "string",
  required: true,
  comments:
    "Select which Qualys API plane to send the request to. Gateway uses JWT auth and JSON. Classic uses Basic auth with X-Requested-With and may return XML.",
  clean: util.types.toString,
  model: [
    { label: "Gateway (CSAM/GAV)", value: ApiPlane.Gateway },
    { label: "Classic (VM/PC)", value: ApiPlane.Classic },
  ],
});
export const rawRequestInputs = {
  connection,
  plane,
  ...rawRequestHttpInputs,
  url: {
    ...rawRequestHttpInputs.url,
    comments:
      "Input the path only (e.g., /rest/2.0/search/am/asset). The base URL is determined by the selected API plane.",
    example: "/rest/2.0/search/am/asset",
  },
};
