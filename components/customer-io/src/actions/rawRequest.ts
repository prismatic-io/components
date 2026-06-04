import { action, util } from "@prismatic-io/spectral";
import { region, connectionInput } from "../inputs";
import { createCustomerClient } from "../client";

import {
  handleErrors,
  sendRawRequest,
  inputs as httpClientInputs,
} from "@prismatic-io/spectral/dist/clients/http";

const rawRequest = action({
  display: {
    label: "Raw Request - Track API",
    description: "Send raw HTTP request to Customer.io",
  },
  inputs: {
    connection: connectionInput,
    region,
    ...httpClientInputs,
    url: {
      ...httpClientInputs.url,
      comments:
        "Input the path only (/v1/accounts/region), The base URL is already included (https://track.customer.io/api). For example, to connect to https://track.customer.io/api/v1/accounts/region, only /v1/accounts/region is entered in this field.",
      example: "/v1/accounts/region",
    },
  },
  perform: async (context, { connection, region, ...httpClientInputs }) => {
    const client = createCustomerClient(connection, region);
    const siteid = client.siteid;
    const apikey = client.apikey;
    try {
      const { data } = await sendRawRequest(
        "https://track.customer.io/api",
        httpClientInputs,
        {
          Authorization: `Basic ${Buffer.from(`${siteid}:${apikey}`).toString(
            "base64"
          )}`,
        }
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types?.toJSON(handled);
      throw new Error(serialized);
    }
  },
});

export default rawRequest;
