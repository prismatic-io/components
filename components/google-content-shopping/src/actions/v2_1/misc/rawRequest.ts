import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { CONTENT_API_BASE_URL } from "../../../constants";
import { rawRequestExamplePayload } from "../../../examplePayloads/v2_1";
import { rawRequestInputs } from "../../../inputs/v2_1";
import { getAccessToken } from "../../../util";
export const rawRequest = action({
  display: {
    label: "Raw Request (Legacy v2.1)",
    description: "Send a raw HTTP request to the Google Content API.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, version, ...requestInputs }) => {
    const url = `${CONTENT_API_BASE_URL}/${version}`;
    const token = getAccessToken(connection);
    const { data } = await sendRawRequest(
      url,
      { ...requestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    return { data };
  },
  examplePayload: rawRequestExamplePayload,
});
