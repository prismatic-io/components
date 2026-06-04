import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../inputs";
import { buildAuthHeaders, getHostBasedOnConnection } from "../client";

const { debugRequest, ...httpInputsWithoutDebug } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Confluence",
  },
  inputs: {
    connection: connectionInput,
    ...httpInputsWithoutDebug,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/wiki/api/v2/attachments/attachments), The base URL is already included (https://{your-domain}). For example, to connect to https://{your-domain}/wiki/api/v2/attachments, only /wiki/api/v2/attachments/attachments is entered in this field.",
      example: "/wiki/api/v2/attachments/attachments",
      placeholder: "/wiki/api/v2/attachments/attachments",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    const baseUrl = await getHostBasedOnConnection(connection);
    const authHeader = buildAuthHeaders(connection);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      {
        ...authHeader,
        Accept: "application/json",
      },
    );
    
    return { data: { data } };
  },
});

export default rawRequest;
