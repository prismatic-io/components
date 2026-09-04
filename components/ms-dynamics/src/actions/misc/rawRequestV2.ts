import { action, PerformSafety, util } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestV2ExamplePayload } from "../../examplePayloads";
import { rawRequestV2Inputs } from "../../inputs";
import { getAuthorizationHeader } from "../../util";
export const rawRequestV2 = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Microsoft Dynamics 365.",
  },
  inputs: rawRequestV2Inputs,
  examplePayload: rawRequestV2ExamplePayload,
  perform: async (context, { connection, ...httpInputParams }) => {
    const apiEndpoint = util.types.toString(connection.fields.webApiUrl);
    const { data } = await sendRawRequest(
      apiEndpoint,
      { ...httpInputParams, debugRequest: context.debug.enabled },
      {
        Authorization: getAuthorizationHeader(connection),
      },
    );
    return { data };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
});
