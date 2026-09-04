import { action, PerformSafety } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getWebApiUrl } from "../../client";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";
import { getAuthorizationHeader } from "../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request (Deprecated)",
    description: "Sends a raw HTTP request to Microsoft Dynamics 365 CRM.",
  },
  inputs: rawRequestInputs,
  examplePayload: rawRequestExamplePayload,
  perform: async (context, { connection, ...httpInputParams }) => {
    const webApiUrl = await getWebApiUrl(connection, context.debug.enabled);
    const { data } = await sendRawRequest(
      webApiUrl,
      { ...httpInputParams, debugRequest: context.debug.enabled },
      {
        Authorization: getAuthorizationHeader(connection),
      },
    );
    return { data };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
});
