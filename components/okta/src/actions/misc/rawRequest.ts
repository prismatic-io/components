import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "../../inputs/general";
import { getBaseUrl, getToken } from "../../util/util";

const { debugRequest, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Okta.",
  },
  perform: async ({ debug: { enabled: debug } }, { connection, ...httpClientInputs }) => {
    const baseUrl = getBaseUrl(connection);
    const token = await getToken(connection);
    const headers = {
      Authorization: token,
      "okta-response": "omitCredentials",
    };
    const { data } = await sendRawRequest(
      `${baseUrl}/api/v1`,
      {
        ...httpClientInputs,
        debugRequest: debug,
      },
      headers,
    );
    return { data };
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/users), The base URL is already included (https://{yourOktaDomain}.com/api/v1). For example, to connect to https://{yourOktaDomain}.com/api/v1/users, only /users is entered in this field.",
      example: "/users",
    },
  },
});
