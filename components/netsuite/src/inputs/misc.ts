import { input } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/http";
import { QUERY_SERVICE, RECORD_SERVICE } from "../constants";
import { restServiceTypeClean } from "../utils";
import { connectionInput } from "./common";

const serviceType = input({
  label: "Service Type",
  type: "string",
  comments:
    "Selects which NetSuite REST service the request targets: the record service for CRUD operations, or the query service for SuiteQL.",
  model: [
    { label: "CRUD (Record)", value: RECORD_SERVICE },
    { label: "Query", value: QUERY_SERVICE },
  ],
  default: RECORD_SERVICE,
  placeholder: "Select service type",
  required: true,
  clean: restServiceTypeClean,
});

const { debugRequest: _, ...noDebugRawRequestInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...noDebugRawRequestInputs,
  serviceType,
  url: {
    ...noDebugRawRequestInputs.url,
    comments:
      "The request path only, relative to the base URL. The base URL is supplied automatically from the connection and the selected Service Type (https://{accountId}.suitetalk.api.netsuite.com/services/rest/record/v1 or .../query/v1). For example, enter /contact to reach the contact record endpoint.",
    example: "/contact",
    placeholder: "Enter path (e.g., /contact)",
  },
};
