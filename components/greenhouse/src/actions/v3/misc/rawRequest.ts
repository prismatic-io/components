import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { V3_BASE_URL } from "../../../constants";
import { rawRequestV3ExamplePayload } from "../../../examplePayloads/v3/misc";
import { rawRequestV3Inputs } from "../../../inputs/v3/misc";
import { getV3Token } from "../../../util";

export const rawRequestV3 = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Greenhouse.",
  },
  inputs: rawRequestV3Inputs,
  perform: async (context, { connection, ...httpClientInputs }) => {
    const token = getV3Token(connection);
    const { data } = await sendRawRequest(
      V3_BASE_URL,
      { ...httpClientInputs, debugRequest: context.debug.enabled },
      { Authorization: `Bearer ${token}` },
    );
    return { data };
  },
  examplePayload: rawRequestV3ExamplePayload,
});
