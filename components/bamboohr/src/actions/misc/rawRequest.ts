import { action, util } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/http";
import { GATEWAY_URL } from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequestInputs } from "../../inputs";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send a raw HTTP request to BambooHR.",
  },
  inputs: rawRequestInputs,
  examplePayload: rawRequestExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { connection, ...httpInputValues }) => {
    const encodedAuth = Buffer.from(`${connection.fields.apiKey}:x`).toString(
      "base64",
    );
    const { data, headers } = await sendRawRequest(
      `${GATEWAY_URL}/${util.types.toString(connection.fields.companyDomain)}/`,
      { ...httpInputValues, debugRequest: context.debug.enabled },
      {
        Authorization: `Basic ${encodedAuth}`,
      },
    );
    return { data: { data, headers } };
  },
});
