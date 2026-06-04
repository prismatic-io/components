import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../inputs";
import { getAccessToken } from "../client";

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Box",
  },
  inputs: {
    connection: connectionInput,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/2.0/folders), The base URL is already included (https://api.box.com). For example, to connect to https://api.box.com/2.0/folders, only /2.0/folders is entered in this field.",
      example: "/2.0/folders",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    const accessToken = getAccessToken({ boxConnection: connection });
    const { data } = await sendRawRequest(
      "https://api.box.com",
      httpClientInputs,
      { Authorization: `Bearer ${accessToken}` },
    );
    return { data };
  },
});

export default rawRequest;
