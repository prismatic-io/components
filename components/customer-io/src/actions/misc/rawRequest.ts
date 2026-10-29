import { action, util } from "@prismatic-io/spectral";
import { rawRequestInputs } from "../../inputs";
import { createCustomerClient } from "../../client";

import {
  handleErrors,
  sendRawRequest,
} from "@prismatic-io/spectral/dist/clients/http";

const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Customer.io.",
  },
  inputs: rawRequestInputs,
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
            "base64",
          )}`,
        },
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
