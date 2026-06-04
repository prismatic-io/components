import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";

export const addLeadLabel = action({
  display: {
    label: "Add Lead Label",
    description: "Adds a lead label.",
  },
  perform: async (context, { connection, name, color }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/leadLabels", { name, color });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    name: input({
      label: "Name",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The name of the lead label",
    }),
    color: input({
      label: "Color",
      type: "string",
      required: true,
      model: [
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
        { label: "Red", value: "red" },
        { label: "Yellow", value: "yellow" },
        { label: "Purple", value: "purple" },
        { label: "Gray", value: "gray" },
      ],
      clean: util.types.toString,
      comments: "The color of the label",
    }),
  },
});
