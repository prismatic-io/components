import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { createClient } from "../../client";
import { rawRequestInputs } from "../../inputs";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description:
      "Send raw HTTP request to the Jira Service Management REST API.",
  },
  inputs: rawRequestInputs,
  perform: async ({ debug: { enabled: debug } }, { connection, ...rest }) => {
    const { client, baseUrl } = await createClient(connection, debug);
    const { data } = await sendRawRequest(
      baseUrl,
      { ...rest, debugRequest: debug },
      (client.defaults?.headers ?? {}) as Record<string, string>,
    );
    return { data };
  },
});
