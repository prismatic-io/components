import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const searchLeads = action({
  display: {
    label: "Search Leads",
    description: "Searches leads.",
  },
  perform: async (
    context,
    {
      connection,
      term,
      fields,
      exactMatch,
      personId,
      organizationId,
      includeFields,
      limit,
      cursor,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/leads/search", {
      params: {
        term,
        fields,
        exact_match: exactMatch,
        person_id: personId,
        organization_id: organizationId,
        include_fields: includeFields,
        limit,
        cursor,
      },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    term: input({
      label: "Term",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The search term to look for",
    }),
    fields: input({
      label: "Fields",
      type: "string",
      model: [
        { label: "Custom Fields", value: "custom_fields" },
        { label: "Notes", value: "notes" },
        { label: "Title", value: "title" },
      ],
      clean: cleanString,
      comments: "A comma-separated string array",
    }),
    exactMatch: input({
      label: "Exact Match",
      type: "boolean",
      clean: util.types.toBool,
      comments: "When enabled, only full exact matches against the given term are returned",
    }),
    personId: input({
      label: "Person ID",
      type: "string",
      clean: cleanNumber,
      comments: "Will filter leads by the provided person ID",
    }),
    organizationId: input({
      label: "Organization ID",
      type: "string",
      clean: cleanNumber,
      comments: "Will filter leads by the provided organization ID",
    }),
    includeFields: input({
      label: "Include Fields",
      type: "string",
      model: [{ label: "Lead Was Seen", value: "lead.was_seen" }],
      clean: cleanString,
      comments:
        "Supports including optional fields in the results which are not provided by default",
    }),
    limit: paginationLimitInput,
    cursor,
  },
});
