import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getAuthorizationHeader } from "../../client";
import { BASE_URL, NOTION_VERSION } from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Notion",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...params }) => {
    const { data } = await sendRawRequest(
      BASE_URL,
      {
        ...params,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: getAuthorizationHeader(connection),
        "Notion-Version": NOTION_VERSION,
      },
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
