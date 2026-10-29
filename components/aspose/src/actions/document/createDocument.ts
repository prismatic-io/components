import { action } from "@prismatic-io/spectral";
import { getAsposeClient } from "../../client";
import { createDocumentExamplePayload } from "../../examplePayloads";
import { connection, fileName } from "../../inputs";

export const createDocument = action({
  display: {
    label: "Create Document",
    description:
      "Creates a new document in cloud storage in the format," +
      " determined by the file extension. All save format extensions are supported.",
  },
  inputs: {
    connection,
    fileName,
  },
  perform: async (context, { connection, fileName }) => {
    const client = await getAsposeClient(connection, context.debug.enabled);

    const { data } = await client.put(`/words/create`, null, {
      params: {
        FileName: fileName || undefined,
      },
    });

    return { data };
  },
  examplePayload: createDocumentExamplePayload,
});
