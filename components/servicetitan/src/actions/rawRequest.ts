import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "../client";
import { connection, urlType } from "../inputs";
import {
  getApplicationKeyFromConnection,
  getTokenFromConnection,
  getURLFromConnection,
} from "../util";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to ServiceDesk Plus",
  },
  inputs: {
    connection,
    urlType,
    ...rawRequestInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/jobs), The base URL is already included (https://api.servicetitan.io/jpm/v2/{YOUR-TENANT}/). For example, to connect to https://api.servicetitan.io/jpm/v2/{YOUR-TENANT}/jobs, only /jobs is entered in this field. e.g. /jobs",
      placeholder: "/jobs",
      example: "/jobs",
    },
  },
  perform: async (context, { connection, urlType, ...httpClientInputs }) => {
    validateConnection(connection);
    const applicationKey = getApplicationKeyFromConnection(connection);
    const completeServiceTitanURL = getURLFromConnection(connection, urlType);
    const token = getTokenFromConnection(connection);
    const { data } = await sendRawRequest(
      completeServiceTitanURL,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${token}`,
        Accepts: "application/json",
        "Content-type": "application/json",
        "ST-App-Key": applicationKey,
      },
    );
    return { data };
  },
});
