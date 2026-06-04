import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, leadLabelIdInput } from "../../inputs";
import { cleanString } from "../../util";

export const updateLeadLabel = action({
  display: {
    label: "Update Lead Label",
    description: "Updates a lead label.",
  },
  perform: async (context, { connection, id, name, color }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(`/leadLabels/${id}`, { name, color });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: leadLabelIdInput,
    name: input({
      label: "Name",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The name of the lead label",
    }),
    color: input({
      label: "Color",
      type: "string",
      required: false,
      model: [
        { label: "Green", value: "green" },
        { label: "Blue", value: "blue" },
        { label: "Red", value: "red" },
        { label: "Yellow", value: "yellow" },
        { label: "Purple", value: "purple" },
        { label: "Gray", value: "gray" },
      ],
      clean: cleanString,
      comments: "The color of the label",
    }),
  },
});
