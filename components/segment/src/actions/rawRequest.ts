import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { getHeaders, validateConnection } from "../client";
import { connectionInput, region } from "../inputs";
import { handleErrors } from "../util";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Segment",
  },
  inputs: {
    connection: connectionInput,
    region,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/employees), The base URL is already included (https://apí.segmentapis.com/). For example, to connect to https://apí.segmentapis.com/employees, only /employees is entered in this field.",
      example: "/employees",
    },
  },
  perform: async (context, { connection, region, ...rawRequestInputs }) => {
    validateConnection(connection);
    const url = `https://${region}.segmentapis.com/`;
    const headers = getHeaders(connection);
    const { data } = await handleErrors(
      sendRawRequest(
        url,
        {
          ...rawRequestInputs,
          debugRequest: context.debug.enabled,
        },
        headers,
      ),
    );
    return { data };
  },
});

export default rawRequest;
