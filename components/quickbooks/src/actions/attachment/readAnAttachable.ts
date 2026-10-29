import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { attachableId, connectionInput, minorVersion } from "../../inputs";

export const readAnAttachable = action({
  display: {
    label: "Read Attachable",
    description: "Read an attachable object.",
  },
  perform: async (context, { connection, attachableId, minorVersion }) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const { data } = await client.get(`/attachable/${attachableId}`, {
      headers: { Accept: "application/json" },
      params: { minorversion: minorVersion },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    attachableId,
    minorVersion: { ...minorVersion, default: "75" },
  },
});
