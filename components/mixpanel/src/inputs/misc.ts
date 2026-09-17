import { input, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { jsonInputClean } from "../util";
import {
  connectionInput,
  regionAndDomain,
  project_id,
  workspace_id,
} from "./common";
const { debugRequest: _, ...rawRequestHttpInputs } = httpClientInputs;
export const script = input({
  label: "Script",
  type: "string",
  clean: util.types.toString,
  comments:
    "The JQL script to execute. See the [JQL API](https://docs.mixpanel.com/reference/query-jql) documentation for query syntax.",
  placeholder: "Enter JQL script",
  required: true,
  example:
    "function main(){return Events(params).groupBy(['name'],mixpanel.reducer.count())}",
});
export const params = input({
  label: "Params",
  type: "code",
  language: "json",
  comments:
    "A JSON object containing parameters that will be made available to the JQL script as the params global variable.",
  example: JSON.stringify(
    {
      from_date: "2024-01-01",
      to_date: "2024-01-31",
      event_name: "Page View",
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});
export const customJQLQueryInputs = {
  connection: connectionInput,
  regionAndDomain,
  script,
  params,
  project_id,
  workspace_id,
};
export const rawRequestInputs = {
  connection: connectionInput,
  baseUrl: {
    ...rawRequestHttpInputs.url,
    label: "Base URL",
    comments:
      "The base URL to send the request to. For example, https://api.mixpanel.com/ or https://api-eu.mixpanel.com/",
    example: "https://api.mixpanel.com/",
    required: true,
  },
  ...rawRequestHttpInputs,
  url: {
    ...rawRequestHttpInputs.url,
    comments:
      "Input the path only (/import), The base URL is going to defined in the previous input. For example, to connect to https://api.mixpanel.com/import, only /import is entered in this field and https://api.mixpanel.com/ is entered in the 'Base URL' field.",
    example: "/import",
  },
};
