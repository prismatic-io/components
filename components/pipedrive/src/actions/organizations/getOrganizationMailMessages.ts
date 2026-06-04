import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  organizationIdInput,
  paginationLimitInput,
  paginationStartInput,
} from "../../inputs";

export const getOrganizationMailMessages = action({
  display: {
    label: "Get Organization Mail Messages",
    description: "Lists mail messages associated with an organization.",
  },
  perform: async (context, { connection, id, start, limit }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/organizations/${id}/mailMessages`, {
      params: { start, limit },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: organizationIdInput,
    start: paginationStartInput,
    limit: paginationLimitInput,
  },
});
