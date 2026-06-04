import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, version } from "../inputs";
import { rawRequestExamplePayload } from "../examplePayloads";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Google Content Shopping",
  },
  inputs: {
    connection: connectionInput,
    version,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/{merchantId}/accounts), The base URL is already included (https://shoppingcontent.googleapis.com/content/{version}). For example, to connect to https://shoppingcontent.googleapis.com/content/v2.1/{merchantId}/accounts, only /{merchantId}/accounts is entered in this field.",
      example: "/{merchantId}/accounts",
    },
  },
  perform: async (context, { connection, version, ...rawRequestInputs }) => {
    const url = `https://shoppingcontent.googleapis.com/content/${version}`;
    const token = util.types.toString(connection.token?.access_token);
    const { data } = await sendRawRequest(
      url,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});

export default rawRequest;
