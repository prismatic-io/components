import { action, util } from "@prismatic-io/spectral";
import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { connection, explicitArray } from "../inputs";
import { createHttpClient, validateConnection } from "../client";
import { RAW_REQUEST_EXAMPLE } from "../constants";
import { getXmlBoilerplate } from "../utils";
import { parseStringPromise } from "xml2js";
import { rawRequestPayload } from "../examplePayloads/rawRequestPayload";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Sage Intacct",
  },
  inputs: {
    connection,
    data: {
      ...httpClientInputs.data,
      comments:
        "The raw XML function to execute. Add the structure as per the [Sage Intacct API documentation](https://developer.intacct.com/). For the provided default example, see the [Query and List Contacts function](https://developer.intacct.com/api/company-console/contacts/). Authentication is already handled by the action.",
      language: "xml",
      type: "code",
      example: RAW_REQUEST_EXAMPLE,
      default: RAW_REQUEST_EXAMPLE,
      clean: util.types.toString,
    },
    headers: {
      ...httpClientInputs.headers,
      comments: `${httpClientInputs.headers.comments} <strong>Note:</strong> Sage Intacct API is XML based. Content-Type: 'application/xml' header is already added.`,
    },
    responseType: {
      ...httpClientInputs.responseType,
      model: [
        { label: "JSON", value: "json" },
        { label: "XML", value: "text" },
      ],
      comments:
        "The type of data format expected in the response. Select 'JSON' for JSON format or 'XML' for raw XML text.",
    },
    explicitArray,
    timeout: {
      ...httpClientInputs.timeout,
    },
    retryDelayMS: {
      ...httpClientInputs.retryDelayMS,
    },
    retryAllErrors: {
      ...httpClientInputs.retryAllErrors,
    },
    maxRetries: {
      ...httpClientInputs.maxRetries,
    },
    useExponentialBackoff: {
      ...httpClientInputs.useExponentialBackoff,
    },
  },
  perform: async (
    context,
    {
      connection,
      data,
      headers,
      responseType,
      timeout,
      retryDelayMS,
      retryAllErrors,
      maxRetries,
      useExponentialBackoff,
      explicitArray,
    },
  ) => {
    validateConnection(connection);

    const client = createHttpClient(connection, {
      debug: context.debug.enabled,
      retryConfig: {
        retryDelay: retryDelayMS,
        retryAllErrors,
        retries: maxRetries,
        useExponentialBackoff,
      },
    });
    const action = data;
    const toSend = getXmlBoilerplate(action, connection);

    const cleanHeaders: Record<string, string> =
      util.types.keyValPairListToObject(headers);

    
    const { data: xmlResponse } = await client.post("/", toSend, {
      maxBodyLength: Number.POSITIVE_INFINITY,
      headers: cleanHeaders,
      responseType,
      timeout,
    });

    








    const responseData =
      responseType === "json"
        ? await parseStringPromise(xmlResponse, { explicitArray })
        : xmlResponse;

    

    return { data: responseData };
  },
  examplePayload: rawRequestPayload,
});
