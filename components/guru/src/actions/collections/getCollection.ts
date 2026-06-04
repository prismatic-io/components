import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { getCollectionInputs } from "../../inputs";
import { getCollectionPayload } from "../../examplePayloads";

export const getCollection = action({
  display: {
    label: "Get Collection",
    description: "Retrieve details of a specific collection by ID",
  },
  perform: async (context, { connection, collectionId }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const response = await client.get(`/collections/${collectionId}`);
    const { data } = response;

    return { data };
  },
  inputs: getCollectionInputs,
  examplePayload: getCollectionPayload,
});
