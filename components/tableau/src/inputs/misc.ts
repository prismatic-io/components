import { inputs as httpClientInputs } from "@prismatic-io/spectral/dist/clients/http";
import { apiVersion, connectionInput } from "./common";

export const rawRequestInputs = {
  connection: connectionInput,
  ...httpClientInputs,
  url: {
    ...httpClientInputs.url,
    comments:
      "Input the path only (/projects); the base URL is already included (https://{inputHostName}/api/{inputApiVersion}/sites/{siteId}). For example, to connect to https://{inputHostName}/api/{inputApiVersion}/sites/{siteId}/projects, enter only /projects in this field. Note: {inputHostName} is derived from the Host Name input in the connection configuration, {inputApiVersion} is based on the API Version input (default is 3.6), and {siteId} is automatically appended.",
    example: "/projects",
  },
  apiVersion,
};
