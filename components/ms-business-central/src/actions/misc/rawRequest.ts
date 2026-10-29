import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../../inputs/general";
import { validateConnection } from "../../utils";

const { debugRequest, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to Microsoft's Business Central API",
  },
  perform: async (context, { connection, ...httpClientInputs }) => {
    validateConnection(connection);
    const baseUrl = util.types.toString(connection.fields.webApiUrl);
    const accessToken = util.types.toString(connection.token?.access_token);

    const { data } = await sendRawRequest(
      `${baseUrl}/api/v2.0`,
      {
        ...httpClientInputs,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: `Bearer ${accessToken}`,
      },
    );

    return { data };
  },
  inputs: {
    connection: connectionInput,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/companies(companyId), the base URL along with the version is already included",
    },
  },
});
