import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const markdownRender = action({
  display: {
    label: "Markdown Render",
    description: "Render a Markdown document",
  },
  perform: async (context, { connection, text, mode, ctx }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/markdown`, {
      text,
      mode,
      context: ctx,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    text: {
      label: "Text",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The Markdown text to render in HTML",
    },
    mode: {
      label: "Mode",
      type: "string",
      required: false,
      default: "markdown",
      model: [
        { label: "Markdown", value: "markdown" },
        { label: "Gfm", value: "gfm" },
      ],
      example: "markdown",
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The rendering mode",
    },
    ctx: {
      label: "Context",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments:
        'The repository context to use when creating references in "gfm" mode',
    },
  },
});

const markdownRenderRaw = action({
  display: {
    label: "Markdown Render Raw",
    description: "Render a Markdown document in raw mode",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/markdown/raw`, {});
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

export default {
  markdownRender,
  markdownRenderRaw,
};
