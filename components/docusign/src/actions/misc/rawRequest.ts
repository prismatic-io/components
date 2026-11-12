import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/http";
import { rawRequestInputs } from "../../inputs";
import { getBaseUrl } from "../../client";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to DocuSign.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...httpClientInputs }) => {
    const { data } = await sendRawRequest(
      await getBaseUrl(connection, false),
      httpClientInputs,
      { Authorization: `Bearer ${connection.token?.access_token}` },
    );
    return { data };
  },
});
