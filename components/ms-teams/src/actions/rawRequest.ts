import { action, util } from "@prismatic-io/spectral";
import { baseUrl } from "../client";
import { connection } from "../inputs";
import {
  handleErrors,
  sendRawRequest,
  inputs as httpClientInputs,
} from "@prismatic-io/spectral/dist/clients/http";

const { debugRequest: _, ...httpInputsWithoutDebug } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft Teams",
  },
  inputs: {
    connection,
    ...httpInputsWithoutDebug,
    url: {
      ...httpClientInputs.url,
      comments: `Input the path only (/users), The base URL is already included (${baseUrl}). For example, to connect to ${baseUrl}/users, only /users is entered in this field.`,
      example: "/users",
    },
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    try {
      const { data } = await sendRawRequest(
        baseUrl,
        { ...httpClientInputs, debugRequest: context.debug.enabled },
        {
          Authorization: `Bearer ${connection.token.access_token}`,
        },
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
