import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";
import { WebhookVersion } from "../../constants";

export const addOrganization = action({
  display: {
    label: "Add Organization",
    description: "Adds an organization.",
  },
  perform: async (context, { connection, name, ownerId, visibleTo, addTime }) => {
    const client = createClient(connection, context.debug.enabled, WebhookVersion.V2);
    const { data } = await client.post("/organizations", {
      name,
      owner_id: ownerId,
      visible_to: visibleTo,
      add_time: addTime,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    name: input({
      label: "Name",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The name of the organization",
      example: "Acme Corporation",
      placeholder: "Enter organization name",
    }),
    ownerId: input({
      label: "Owner ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of the user who will be marked as the owner of this organization",
      example: "123",
      placeholder: "Enter User ID",
    }),
    visibleTo: input({
      label: "Visible To",
      type: "string",
      required: false,
      model: [
        { label: "1", value: "1" },
        { label: "3", value: "3" },
        { label: "5", value: "5" },
        { label: "7", value: "7" },
      ],
      clean: cleanString,
      comments: "The visibility of the organization",
    }),
    addTime: input({
      label: "Add Time",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The optional creation date & time of the organization in UTC",
    }),
  },
});
