import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, minorVersion, updateRequestBody } from "../../inputs";

export const updateAttachable = action({
  display: {
    label: "Update Attachable",
    description:
      "Update any of the writable fields of an existing attachable object.",
  },
  perform: async (context, { connection, updateRequestBody, minorVersion }) => {
    const client = createHttpClient(connection, context.debug.enabled);

    const { data } = await client.post("/attachable", updateRequestBody, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      params: { minorversion: minorVersion },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    updateRequestBody,
    minorVersion: { ...minorVersion, default: "75" },
  },
});
