import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { action } from "@prismatic-io/spectral";
import { rawRequestInputs } from "../../inputs";
import { BASE_URL } from "../../constants";
import { getAuthorizationHeaderValue } from "../../client";
import { validateConnection } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Guru API",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateConnection(connection);

    const { data } = await sendRawRequest(
      BASE_URL,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: getAuthorizationHeaderValue(connection),
      },
    );

    return { data };
  },
});
