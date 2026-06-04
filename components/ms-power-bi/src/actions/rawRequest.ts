import { action } from "@prismatic-io/spectral";
import { inputs as httpClientInputs, sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { connection } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft Power BI",
  },
  inputs: {
    connection,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/profiles), The base URL is already included (https://api.powerbi.com/v1.0/myorg). For example, to connect to https://api.powerbi.com/v1.0/myorg/profiles, only /profiles is entered in this field.",
      example: "/profiles",
      default: "/imports",
    },
  },
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { data } = await sendRawRequest(
      "https://api.powerbi.com/v1.0/myorg",
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${connection.token.access_token}`,
        "Content-Type": "application/json",
      },
    );
    return { data };
  },
});

export default rawRequest;
