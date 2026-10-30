import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getPayload } from "../../client";
import { rawRequestInputs } from "../../inputs";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to Jira.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const config = await getPayload(connection);
    const { auth, host } = config;
    const baseUrl = `https://${host}`;

    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: auth,
        Accept: "application/json",
      },
    );
    return { data: { data } };
  },
});
