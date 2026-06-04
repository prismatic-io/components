import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  organizationIdInput,
  paginationLimitInput,
  paginationStartInput,
} from "../../inputs";
import { cleanString } from "../../util";

export const getOrganizationUpdates = action({
  display: {
    label: "Get Organization Updates",
    description: "Lists updates about an organization.",
  },
  perform: async (context, { connection, id, start, limit, allChanges, items }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/organizations/${id}/flow`, {
      params: { start, limit, all_changes: allChanges, items },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: organizationIdInput,
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
