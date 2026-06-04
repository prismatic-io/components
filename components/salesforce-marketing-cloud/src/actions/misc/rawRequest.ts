import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
import { getAuthenticatedConnectionDetails } from "../../util";

export const rawRequest = action({
  examplePayload: rawRequestExamplePayload,
  display: {
    label: "Raw Request",
    description:
      "Send a raw HTTP request to the Salesforce Marketing Cloud REST API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { accessToken, baseUrl } =
      getAuthenticatedConnectionDetails(connection);

    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: `Bearer ${accessToken}`,
      },
    );
    return { data };
  },
});
