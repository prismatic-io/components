import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { getConfig, resolveRequestUrl, toRawRequestParams } from "../../client";
import { restRawRequestInputs } from "../../inputs";
export const restRawRequest = action({
  display: {
    label: "Raw Request (REST)",
    description: "Send a raw HTTP request to Adobe Commerce.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, ...rawRequestInputs }) => {
    const { environmentUrl, authorize } = await getConfig(
      connection,
      context.debug.enabled,
    );
    const { data } = await sendRawRequest(
      environmentUrl,
      { ...rawRequestInputs, debugRequest: context.debug.enabled },
      {
        Authorization: authorize({
          method: rawRequestInputs.method,
          url: resolveRequestUrl(environmentUrl, rawRequestInputs.url),
          params: toRawRequestParams(rawRequestInputs.queryParams),
        }),
      },
    );
    return { data };
  },
  inputs: restRawRequestInputs,
});
