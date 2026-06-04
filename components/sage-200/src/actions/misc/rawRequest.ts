import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { API_URLS } from "../../constants";
import { connection } from "../../inputs/general";
import { validateConnection } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Sage 200",
  },
  inputs: {
    connection,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments: `Input the path only (/sites), The base URL is already included (${API_URLS.professional}). For example, to connect to ${API_URLS.professional}/sites, only /sites is entered in this field.`,
      example: "/sites",
      placeholder: "/sites",
    },
    headers: {
      ...httpClientInputs.headers,
      comments: `${httpClientInputs.headers.comments} Subscription key and Authorization headers are already included.`,
    },
  },
  perform: async (_context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const ocpApimSubscriptionKey = util.types.toString(
      connection.fields["ocp-apim-subscription-key"],
    );
    const sage200edition = util.types.toString(connection.fields.sage200edition);
    const baseUrl = API_URLS[sage200edition];
    const { data } = await sendRawRequest(baseUrl, httpClientInputs, {
      Authorization: `Bearer ${connection.token?.access_token}`,
      "ocp-apim-subscription-key": ocpApimSubscriptionKey,
    });
    return { data };
  },
});
