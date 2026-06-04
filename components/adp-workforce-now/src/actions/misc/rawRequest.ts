import https from "node:https";
import { action, util } from "@prismatic-io/spectral";
import axios from "axios";
import FormData from "form-data";
import _ from "lodash";
import { addInterceptorsToClient, fetchToken } from "../../client";
import { rawRequestInputs } from "../../inputs";
import { getBaseUrl, toFormData, validateConnection } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to the ADP Workforce Now API",
  },
  inputs: rawRequestInputs,
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
    const { sslCert, sslKey } = connection.fields;
    const { accessToken } = await fetchToken(
      context,
      connection,
      context.debug.enabled,
    );
    if (data && (!_.isEmpty(formData) || !_.isEmpty(fileData))) {
      throw new Error("Cannot specify both Data and File/Form Data.");
    }
    const payload =
      !_.isEmpty(formData) || !_.isEmpty(fileData)
        ? toFormData(formData, fileData, fileDataFileNames)
        : data;
    const baseURL = getBaseUrl(connection);
    const client = axios.create({
      baseURL,
      responseType,
      timeout,
      httpsAgent: new https.Agent({
        cert: util.types.toString(sslCert),
        key: util.types.toString(sslKey),
        rejectUnauthorized: true,
      }),
    });
    addInterceptorsToClient(client, context, context.debug.enabled);
    const { data: rawRequestData, headers: responseHeaders } =
      await client.request({
        method,
        url,
        headers: Object.assign(
          Object.assign(
            Object.assign({}, util.types.keyValPairListToObject(headers)),
            payload instanceof FormData ? payload.getHeaders() : {},
          ),
          {
            Authorization: `Bearer ${accessToken}`,
          },
        ),
        params: util.types.keyValPairListToObject(queryParams),
        data: payload || undefined,
      });

    if (typeof rawRequestData === "object") {
      rawRequestData.headers = responseHeaders;
      return {
        data: rawRequestData,
      };
    }
    return {
      data: {
        data: rawRequestData,
        headers: responseHeaders,
      },
    };
  },
});
