import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { listCollectionGroupAccessPayload } from "../../examplePayloads";
import { listCollectionGroupAccessInputs } from "../../inputs";
export const listCollectionGroupAccess = action({
  display: {
    label: "List Collection Group Access",
    description: "Get details of all groups with access to a collection",
  },
  perform: async (context, { connection, collectionId }) => {
    const client = getGuruClient(connection, context.debug.enabled);
    const response = await client.get(`/collections/${collectionId}/groups`);
    const { data } = response;
    return { data };
  },
  inputs: listCollectionGroupAccessInputs,
  examplePayload: listCollectionGroupAccessPayload,
});
