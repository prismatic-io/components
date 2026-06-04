import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const searchDeals = action({
  display: {
    label: "Search Deals",
    description: "Searches deals.",
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
      status,
      includeFields,
      limit,
      cursor,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/deals/search", {
      params: {
        term,
        fields,
        exact_match: exactMatch,
        person_id: personId,
        organization_id: organizationId,
        status,
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
      example: "Software License",
      placeholder: "Enter search term",
    }),
    fields: input({
      label: "Fields",
      type: "string",
      default: "custom_fields,notes,title",
      clean: cleanString,
      comments: "A comma-separated string array",
      example: "custom_fields,notes,title",
      placeholder: "Enter fields (comma-separated)",
    }),
    exactMatch: input({
      label: "Exact Match",
      type: "boolean",
      clean: util.types.toBool,
      comments: "When true, only full exact matches against the given term are returned",
    }),
    personId: input({
      label: "Person ID",
      type: "string",
      clean: cleanNumber,
      comments: "Will filter deals by the provided person ID",
      example: "123",
      placeholder: "Enter Person ID",
    }),
    organizationId: input({
      label: "Organization ID",
      type: "string",
      clean: cleanNumber,
      comments: "Will filter deals by the provided organization ID",
      example: "123",
      placeholder: "Enter Organization ID",
    }),
    status: input({
      label: "Status",
      type: "string",
      model: [
        { label: "Open", value: "open" },
        { label: "Won", value: "won" },
        { label: "Lost", value: "lost" },
      ],
      clean: cleanString,
      comments: "Will filter deals by the provided specific status",
    }),
    includeFields: input({
      label: "Include Fields",
      type: "string",
      model: [{ label: "Deal Cc Email", value: "deal.cc_email" }],
      clean: cleanString,
      comments:
        "Supports including optional fields in the results which are not provided by default",
    }),
    limit: paginationLimitInput,
    cursor,
  },
});
