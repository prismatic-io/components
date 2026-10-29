import { action, util } from "@prismatic-io/spectral";
import {
  inputs as httpClientInputs,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";
import { connectionInput, version } from "../inputs";

const { debugRequest: _, ...rawRequestInputs } = httpClientInputs;

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to ShipBob",
  },
  inputs: {
    connection: connectionInput,
    version,
    ...rawRequestInputs,
    url: {
      ...rawRequestInputs.url,
      example:
        "Input the path only (/orders), The base URL is already included (https://api.shipbob.com/1.0). For example, to connect to https://api.shipbob.com/1.0/orders, only /orders is entered in this field. e.g. /orders",
    },
  },
  perform: async (context, { connection, version, ...rawRequestInputs }) => {
    const url = `https://api.shipbob.com/${version}`;
    const token = util.types.toString(connection?.fields?.apiToken);
    if (!token) {
      throw new Error(
        "Couldn't retrieve API Token" +
          " from connection fields. Check your connection API Token field and " +
          "make sure it's correctly set.",
      );
    }
    const { data } = await sendRawRequest(
      url,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return { data };
  },
});

export default rawRequest;
