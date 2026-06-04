import { action } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { baseUrl, connection } from "../inputs";
import { checkConnection, getToken } from "../utils";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description:
      "Send raw HTTP request to an ArcGIS API endpoint. This action will append the OAuth2 token to the request headers. The token's validity is contingent upon the connection configuration. Please ensure that the token is compatible with the API you intend to connect to.",
  },
  inputs: {
    connection,
    baseUrl,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      comments:
        "Input the path only (/findAddressCandidates?f=pjson&singleLine=1600 Pennsylvania Ave NW, DC), The base URL is taken from the Base URL input. For example, to connect to https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=pjson&singleLine=1600 Pennsylvania Ave NW, DC, only /findAddressCandidates?f=pjson&singleLine=1600 Pennsylvania Ave NW, DC is entered in this field.",
      example:
        "/findAddressCandidates?f=pjson&singleLine=1600 Pennsylvania Ave NW, DC",
    },
  },
  perform: async (context, { connection, baseUrl, ...rawRequestInputs }) => {
    checkConnection(connection);
    const arcgisToken = getToken(connection);

    const { data } = await sendRawRequest(
      baseUrl,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${arcgisToken}`,
      },
    );
    return { data };
  },
});
