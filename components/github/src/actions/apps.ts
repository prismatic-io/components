import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const appsGetBySlug = action({
  display: {
    label: "Apps Get By Slug",
    description: "Get an app",
  },
  perform: async (context, { connection, appSlug }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/apps/${appSlug}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    appSlug: {
      label: "App Slug",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

export default {
  appsGetBySlug,
};
