import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const appsCreateFromManifest = action({
  display: {
    label: "Apps Create From Manifest",
    description: "Create a GitHub App from a manifest",
  },
  perform: async (context, { connection, code }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/app-manifests/${code}/conversions`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    code: {
      label: "Code",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

export default {
  appsCreateFromManifest,
};
