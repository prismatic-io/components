import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const searchPersons = action({
  display: {
    label: "Search Persons",
    description: "Searches persons.",
  },
  perform: async (
    context,
    { connection, term, fields, exactMatch, organizationId, includeFields, limit, cursor },
  ) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/persons/search", {
      params: {
        term,
        fields,
        exact_match: exactMatch,
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
      example: "John Doe",
      placeholder: "Enter search term",
    }),
    fields: input({
      label: "Fields",
      type: "string",
      default: "custom_fields,email,notes,phone,name",
      clean: cleanString,
      comments: "A comma-separated string array",
      example: "custom_fields,email,notes,phone,name",
      placeholder: "Enter fields (comma-separated)",
    }),
    exactMatch: input({
      label: "Exact Match",
      type: "boolean",
      clean: util.types.toBool,
      comments: "When true, only full exact matches against the given term are returned",
    }),
    organizationId: input({
      label: "Organization ID",
      type: "string",
      clean: cleanNumber,
      comments: "Will filter persons by the provided organization ID",
      example: "123",
      placeholder: "Enter Organization ID",
    }),
    includeFields: input({
      label: "Include Fields",
      type: "string",
      model: [{ label: "Person Picture", value: "person.picture" }],
      clean: cleanString,
      comments:
        "Supports including optional fields in the results which are not provided by default",
    }),
    limit: paginationLimitInput,
    cursor,
  },
});
