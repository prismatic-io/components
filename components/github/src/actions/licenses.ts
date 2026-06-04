import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const licensesGetAllCommonlyUsed = action({
  display: {
    label: "Licenses Get All Commonly Used",
    description: "Get all commonly used licenses",
  },
  perform: async (context, { connection, featured, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/licenses`, {
      params: { featured, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    featured: {
      label: "Featured",
      type: "boolean",
      required: false,
      clean: (value) => util.types.toBool(value) || undefined,
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const licensesGet = action({
  display: {
    label: "Licenses Get",
    description: "Get a license",
  },
  perform: async (context, { connection, license }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/licenses/${license}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    license: {
      label: "License",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

export default {
  licensesGetAllCommonlyUsed,
  licensesGet,
};
