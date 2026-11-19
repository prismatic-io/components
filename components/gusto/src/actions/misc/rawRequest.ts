import { action, PerformSafety, util } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/http";
import { rawRequestInputs } from "../../inputs";
import { getBaseUrl } from "../../client";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Gusto.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, apiVersion, ...rest }) => {
    const accessToken = util.types.toString(connection.token?.access_token);
    const { data, headers } = await sendRawRequest(
      getBaseUrl(connection),
      {
        ...rest,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: `Bearer ${accessToken}`,
        "X-Gusto-API-Version": apiVersion,
      },
    );
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
});
