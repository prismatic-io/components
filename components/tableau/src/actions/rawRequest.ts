import { action, util } from "@prismatic-io/spectral";
import {
  handleErrors,
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, apiVersion } from "../inputs";
import { signIn } from "../auth";
import { rawRequestExamplePayload } from "../examplePayloads";

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Tableau",
  },
  examplePayload: rawRequestExamplePayload,
  inputs: {
    connection: connectionInput,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/projects); the base URL is already included (https://{inputHostName}/api/{inputApiVersion}/sites/{siteId}). For example, to connect to https://{inputHostName}/api/{inputApiVersion}/sites/{siteId}/projects, enter only /projects in this field. Note: {inputHostName} is derived from the Host Name input in the connection configuration, {inputApiVersion} is based on the API Version input (default is 3.3), and {siteId} is automatically appended.",
      example: "/projects",
    },
    apiVersion,
  },
  perform: async (context, { connection, apiVersion, ...httpClientInputs }) => {
    const {
      credentials: {
        token,
        site: { id },
      },
    } = await signIn({ tableauConnection: connection });

    try {
      const baseUrl = `https://${connection.fields.hostName}/api/${apiVersion}/sites/${id}`;
      const { data } = await sendRawRequest(baseUrl, httpClientInputs, {
        "X-Tableau-Auth": token,
      });
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
});

export default rawRequest;
