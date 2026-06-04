import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { validateConnection } from "../client";
import { rawRequestExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Qlik",
  },
  examplePayload: rawRequestExamplePayload,
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/employees), The base URL is already included (https://{tenant}.us.qlikcloud.com/api/v1). For example, to connect to https://{tenant}.us.qlikcloud.com/api/v1/employees, only /employees is entered in this field.",
      example: "/employees",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { headers, tenant } = validateConnection(connection);
    const baseUrl = `https://${tenant}.us.qlikcloud.com/api/v1`;
    try {
      const { data } = await sendRawRequest(
        baseUrl,
        {
          ...rawRequestInputs,
          debugRequest: context.debug.enabled,
        },
        headers,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});

export default rawRequest;
