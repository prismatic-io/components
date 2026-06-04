import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { listCollectionsInputs } from "../../inputs";
import { listCollectionsPayload } from "../../examplePayloads";

export const listCollections = action({
  display: {
    label: "List Collections",
    description: "Retrieve a list of all collections accessible to the user",
  },
  perform: async (context, { connection, search }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const queryParams = {
      search,
    };

    const { data } = await client.get("/collections", { params: queryParams });

    return { data };
  },
  inputs: listCollectionsInputs,
  examplePayload: listCollectionsPayload,
});
