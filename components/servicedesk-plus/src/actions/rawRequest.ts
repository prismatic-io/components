import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput } from "../inputs";
import { validateConnection } from "../util";

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to ServiceDesk Plus",
  },
  inputs: {
    connection: connectionInput,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      example:
        "Input the path only (/assets), The base URL is already included ({dataCenterURL}). For example, to connect to {dataCenterURL}/api/v3/assets, only /assets is entered in this field. e.g. /assets",
    },
    debugRequest: {
      ...httpClientInputs.debugRequest,
      comments: "Enable this to log the request and response",
    },
  },
  perform: async (
    _context,
    { connection, debugRequest, ...httpClientInputs },
  ) => {
    validateConnection(connection);
    const { dataCenter } = connection.fields;
    const token = util.types.toString(connection.token?.access_token);
    const url = `${dataCenter}/api/v3`;
    const { data } = await sendRawRequest(
      url,
      { ...httpClientInputs, debugRequest },
      {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/vnd.manageengine.sdp.v3+json",
      },
    );
    return { data };
  },
});

export default rawRequest;
