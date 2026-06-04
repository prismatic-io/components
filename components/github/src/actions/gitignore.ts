import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const gitignoreGetAllTemplates = action({
  display: {
    label: "Gitignore Get All Templates",
    description: "Get all gitignore templates",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/gitignore/templates`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
  },
});

const gitignoreGetTemplate = action({
  display: {
    label: "Gitignore Get Template",
    description: "Get a gitignore template",
  },
  perform: async (context, { connection, name }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/gitignore/templates/${name}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

export default {
  gitignoreGetAllTemplates,
  gitignoreGetTemplate,
};
