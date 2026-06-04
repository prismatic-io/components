import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const orgsList = action({
  display: {
    label: "Orgs List",
    description: "List organizations",
  },
  perform: async (context, { connection, since, perPage }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/organizations`, {
      params: { since, per_page: perPage },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    since: {
      label: "Since",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "An organization ID",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
  },
});

const orgsListCustomRoles = action({
  display: {
    label: "Orgs List Custom Roles",
    description: "List custom repository roles in an organization",
  },
  perform: async (context, { connection, organizationId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/organizations/${organizationId}/custom_roles`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    organizationId: {
      label: "Organization Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

export default {
  orgsList,
  orgsListCustomRoles,
};
