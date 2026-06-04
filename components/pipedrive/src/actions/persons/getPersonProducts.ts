import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  paginationLimitInput,
  paginationStartInput,
  personIdInput,
} from "../../inputs";

export const getPersonProducts = action({
  display: {
    label: "Get Person Products",
    description: "Lists products associated with a person.",
  },
  perform: async (context, { connection, id, start, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/persons/${id}/products`, {
      params: { start, limit },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
  },
});
