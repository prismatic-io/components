import { action, util } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { connectionInput, title } from "../inputs";
import { createDocumentExamplePayload } from "../examplePayloads";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";

export const createDocument = action({
  display: {
    label: "Create Document",
    description:
      "Creates a blank document using the title given in the request.",
  },
  examplePayload: createDocumentExamplePayload,
  perform: async (context, { googleConnection, title }) => {
    const googleDocsClient = getClient(googleConnection);
    try {
      const { data } = await googleDocsClient.documents.create({
        requestBody: { title },
      });
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    googleConnection: connectionInput,
    title,
  },
});
