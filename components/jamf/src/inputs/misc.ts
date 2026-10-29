import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "./common";

const { debugRequest: _, ...httpInputs } = httpClientInputs;

const apiType = input({
  label: "API",
  type: "string",
  required: false,
  default: "api",
  model: [
    { label: "Pro API", value: "api" },
    { label: "Classic API", value: "JSSResource" },
  ],
  comments:
    "Which Jamf Pro API to target. The Pro API uses the /api base path; the Classic API uses /JSSResource.",
  clean: util.types.toString,
});

export const rawRequestInputs = {
  connection,
  apiType,
  ...httpInputs,
  url: {
    ...httpInputs.url,
    comments:
      "The API path only (e.g., /v1/computers-inventory for the Pro API, or /computers/id/1 for the Classic API). The base URL and selected API prefix are added automatically.",
    example: "/v1/computers-inventory",
  },
};
