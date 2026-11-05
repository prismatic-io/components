import axios from "axios";
import _ from "lodash";
import FormData from "form-data";
import https from "node:https";
import { action, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "../inputs/general";
import { addInterceptorsToClient, getCookies } from "../client";
import { getBaseUrlAndProxy, toFormData, validateConnection } from "../util";

const { debugRequest, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to the SAP Business One API",
  },
  inputs: {
    ...rawRequestInputs,
    url: {
      ...httpClientInputs.url,
      example: "Items",
      placeholder: "Enter API endpoint path",
      comments:
        "The API endpoint path only (e.g., Items, Orders, BusinessPartners). The base URL is automatically included based on your connection settings. For example, to access Items, enter 'Items' here and it will be appended to the base URL (`https://server:port/b1s/v1` or `v2`).",
    },
    connection,
  },
  perform: async (
    context,
    {
      connection,
      data,
      fileData,
      fileDataFileNames,
      formData,
      headers,
      method,
      queryParams,
      responseType,
      url,
      timeout,
    },
  ) => {
    validateConnection(connection);
    if (data && (!_.isEmpty(formData) || !_.isEmpty(fileData))) {
      throw new Error("Cannot specify both Data and File/Form Data.");
    }
    const payload =
      !_.isEmpty(formData) || !_.isEmpty(fileData)
        ? toFormData(formData, fileData, fileDataFileNames)
        : data;

    const { cookie } = await getCookies(connection, context, context.debug.enabled);
    const { baseUrl, proxy } = getBaseUrlAndProxy(connection);
    const client = axios.create({
      baseURL: baseUrl,
      responseType: responseType,
      timeout: timeout,
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
      proxy,
      headers: {
        Cookie: cookie,
      },
    });
    addInterceptorsToClient(client, context, context.debug.enabled);
    const { data: rawRequestData } = await client.request({
      method: method,
      url: url,
      headers: Object.assign(
        Object.assign(
          Object.assign({}, util.types.keyValPairListToObject(headers)),
          payload instanceof FormData ? payload.getHeaders() : {},
        ),
      ),
      params: util.types.keyValPairListToObject(queryParams),
      data: payload || undefined,
    });
    return {
      data: rawRequestData,
    };
  },
});
