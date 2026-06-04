import { action } from "@prismatic-io/spectral";
import { sendRawRequest } from "@prismatic-io/spectral/dist/clients/http";
import { rawRequestInputs } from "../../inputs";
import { BaseUrl, validateConnection } from "../../util";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description:
      "Sends a raw HTTP request to the Canny API. The API key is injected automatically into the request body.",
  },
  inputs: rawRequestInputs,
  perform: async (context, { connection, ...httpInputs }) => {
    const apiKey = validateConnection(connection);
    const existingBody = httpInputs.data
      ? JSON.parse(httpInputs.data as string)
      : {};
    const dataWithApiKey = JSON.stringify({ apiKey, ...existingBody });

    const { data } = await sendRawRequest(
      BaseUrl.Root,
      {
        ...httpInputs,
        data: dataWithApiKey,
        debugRequest: context.debug.enabled,
      },
      { "Content-Type": "application/json" },
    );

    return { data };
  },
});
