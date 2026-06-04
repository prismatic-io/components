import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../inputs";
import { getCredentials } from "../client";
import { BASE_URL } from "../constants";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Postmark",
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/servers/9363760), The base URL is already included (https://api.postmarkapp.com). For example, to connect to https://api.postmarkapp.com/servers/9363760, only /servers/9363760 is entered in this field.",
      example: "/servers/9363760",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    if (!connection) {
      throw new Error("No connection provided.");
    }
    const { accountToken } = getCredentials({ postmarkConnection: connection });
    const { data } = await sendRawRequest(
      BASE_URL,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      {
        "X-Postmark-Account-Token": accountToken,
      },
    );
    return { data };
  },
});

export default rawRequest;
