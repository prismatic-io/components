import { action, util } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestV2ExamplePayload } from "../../examplePayloads";
import { rawRequestV2Inputs } from "../../inputs";

export const rawRequestV2 = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Microsoft Dynamics 365.",
  },
  inputs: rawRequestV2Inputs,
  examplePayload: rawRequestV2ExamplePayload,
  perform: async (context, { connection, ...httpInputParams }) => {
    const apiEndpoint = util.types.toString(connection.fields.webApiUrl);
    const token = util.types.toString(connection.token.access_token);
    const { data } = await sendRawRequest(
      apiEndpoint,
      { ...httpInputParams, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    return { data };
  },
});
