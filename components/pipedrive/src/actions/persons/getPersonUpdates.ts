import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  paginationLimitInput,
  paginationStartInput,
  personIdInput,
} from "../../inputs";
import { cleanString } from "../../util";

export const getPersonUpdates = action({
  display: {
    label: "Get Person Updates",
    description: "Lists updates about a person.",
  },
  perform: async (context, { connection, id, start, limit, allChanges, items }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/persons/${id}/flow`, {
      params: { start, limit, all_changes: allChanges, items },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: personIdInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
    allChanges: input({
      label: "All Changes",
      type: "string",
      clean: cleanString,
      comments: "Whether to show custom field updates or not",
    }),
    items: input({
      label: "Items",
      type: "string",
      clean: cleanString,
      comments: "A comma-separated string for filtering out item specific updates",
    }),
  },
});
