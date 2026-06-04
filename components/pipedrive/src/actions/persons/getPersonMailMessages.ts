import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  paginationLimitInput,
  paginationStartInput,
  personIdInput,
} from "../../inputs";

export const getPersonMailMessages = action({
  display: {
    label: "Get Person Mail Messages",
    description: "Lists mail messages associated with a person.",
  },
  perform: async (context, { connection, id, start, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/persons/${id}/mailMessages`, {
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
