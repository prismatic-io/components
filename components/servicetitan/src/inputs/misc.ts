import { input } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { cleanStringInput } from "../util";
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
  placeholder: "jpm",
  clean: cleanStringInput,
});
const { debugRequest: _, ...rawRequestHttpInputs } = httpClientInputs;
export const rawRequestInputs = {
  connection,
  urlType,
  ...rawRequestHttpInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "Input the path only (/jobs), The base URL is already included (https://api.servicetitan.io/jpm/v2/{YOUR-TENANT}/). For example, to connect to https://api.servicetitan.io/jpm/v2/{YOUR-TENANT}/jobs, only /jobs is entered in this field. e.g. /jobs",
    placeholder: "/jobs",
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
