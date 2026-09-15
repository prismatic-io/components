import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  pagination,
  sort,
} from "./common";
const urlType = input({
  label: "URL Type",
  type: "string",
  example: "jpm",
  required: true,
  comments:
    "The URL type to connect to. For example, jpm, crm, accounting, etc.",
  placeholder: "Enter a URL type",
  clean: util.types.toString,
});
const { debugRequest: _, ...rawRequestHttpInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection,
  urlType,
  ...rawRequestHttpInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "Input the path only. The base URL is built from the connection environment and the URL Type above, in the form https://api.servicetitan.io/{URL Type}/v2/tenant/{tenant}. For example, with a URL Type of jpm, entering /jobs reaches https://api.servicetitan.io/jpm/v2/tenant/{tenant}/jobs.",
    placeholder: "Enter a path such as /jobs",
    example: "/jobs",
  },
};
export const listBusinessUnitsInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
export const listUserRolesInputs = {
  connection,
  fetchAll,
  pagination,
  includeTotal,
  sort,
  customQueryParams,
};
