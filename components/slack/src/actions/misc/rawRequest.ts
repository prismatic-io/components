import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { createOauthClient } from "../../client";
import { rawRequestInputs } from "../../inputs";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Send raw HTTP request to Slack.",
  },
  inputs: rawRequestInputs,
  perform: async (
    { debug: { enabled: debug } },
    { connection, ...rawRequestParams }
  ) => {
    const client = await createOauthClient({ slackConnection: connection });
    const token = client.token;
    const { data } = await sendRawRequest(
      "https://slack.com/api",
      { ...rawRequestParams, debugRequest: debug },
      { Authorization: `Bearer ${token}` }
    );
    return { data };
  },
});
