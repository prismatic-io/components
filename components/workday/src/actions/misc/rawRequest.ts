import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { validateConnection } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description: "Sends a raw HTTP request to Workday.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...rawRequestInputs }) => {
    validateConnection(connection);
    const workdayToken = connection.token?.access_token;
    const baseUrl = connection.fields.apiUrl as string;

    const { data } = await sendRawRequest(
      baseUrl,
      {
        ...rawRequestInputs,
        debugRequest: context.debug.enabled,
      },
      {
        Authorization: `Bearer ${workdayToken}`,
      },
    );
    return { data };
  },
});
