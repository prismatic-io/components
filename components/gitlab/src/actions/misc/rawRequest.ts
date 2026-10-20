import { action } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { rawRequestInputs } from "../../inputs";
export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to GitLab.",
  },
  inputs: rawRequestInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      url,
      method,
      data,
      queryParams,
      headers,
      responseType,
      timeout,
    },
  ) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const response = await client.request({
      method,
      url,
      data,
      params: queryParams,
      headers,
      responseType,
      timeout,
    });
    return { data: response.data };
  },
});
