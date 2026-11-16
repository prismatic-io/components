import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/http";
import { graphBaseUrl } from "../../client";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
import { getAccessToken } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Microsoft SharePoint.",
  },
  performSafety: "notAllowed",
  perform: async ({ debug: { enabled: debug } }, { connection, ...httpClientInputs }) => {
    const baseUrl = graphBaseUrl(connection);
    const token = await getAccessToken(connection);
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...httpClientInputs,
        debugRequest: debug,
      },
      headers,
    );
    return { data };
  },
  inputs: rawRequestInputs,
  examplePayload: rawRequestExamplePayload,
});
