import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, id } from "../../inputs";

export const deleteAsset = action({
  display: {
    label: "Delete Asset",
    description: "Delete an existing asset",
  },
  inputs: {
    id: {
      ...id,
      dataSource: "selectAsset",
    },
    connection,
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/media/${id}`);
    return { data };
  },
  examplePayload: {
    data: {},
  },
});
