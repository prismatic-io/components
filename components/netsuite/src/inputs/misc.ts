import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "./common";

const serviceType = input({
  label: "Service Type",
  type: "string",
  comments: "The type of service to use.",
  model: [
    { label: "CRUD (Record)", value: "record" },
    { label: "Query", value: "query" },
  ],
  default: "record",
  placeholder: "Select service type",
  required: true,
  clean: util.types.toString,
});





const { debugRequest: _, ...noDebugRawRequestInputs } = httpClientInputs;

export const rawRequestInputs = {
  connection: connectionInput,
  ...noDebugRawRequestInputs,
  serviceType,
  url: {
    ...noDebugRawRequestInputs.url,
    comments:
      "Input the path only (/contact), The base URL is already included (https://{accountId}.suitetalk.api.netsuite.com/services/rest/record/v1). For example, to connect to https://{accountId}.suitetalk.api.netsuite.com/services/rest/record/v1/contact, only /contact is entered in this field.",
    example: "/contact",
    placeholder: "Enter path (e.g., /contact)",
  },
};
