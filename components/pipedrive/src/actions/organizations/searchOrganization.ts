import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, cursor, paginationLimitInput } from "../../inputs";
import { cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const searchOrganization = action({
  display: {
    label: "Search Organization",
    description: "Searches organizations.",
  },
  perform: async (context, { connection, term, fields, exactMatch, limit, cursor }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.get("/organizations/search", {
      params: { term, fields, exact_match: exactMatch, limit, cursor },
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
      example: "Acme Corporation",
      placeholder: "Enter search term",
    }),
    fields: input({
      label: "Fields",
      type: "string",
      default: "address,custom_fields,notes,name",
      clean: cleanString,
      comments: "A comma-separated string array",
      example: "address,custom_fields,notes,name",
      placeholder: "Enter fields (comma-separated)",
    }),
    exactMatch: input({
      label: "Exact Match",
      type: "boolean",
      clean: util.types.toBool,
      comments: "When true, only full exact matches against the given term are returned",
    }),
    limit: paginationLimitInput,
    cursor,
  },
});
