import { action, util, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { cleanNumber, cleanString } from "../../util";

export const addLead = action({
  display: {
    label: "Add Lead",
    description: "Adds a lead.",
  },
  perform: async (
    context,
    {
      connection,
      title,
      ownerId,
      labelIds,
      personId,
      organizationId,
      value,
      expectedCloseDate,
      visibleTo,
      wasSeen,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post("/leads", {
      title,
      owner_id: ownerId,
      label_ids: labelIds,
      person_id: personId,
      organization_id: organizationId,
      value,
      expected_close_date: expectedCloseDate,
      visible_to: visibleTo,
      was_seen: wasSeen,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    title: input({
      label: "Title",
      type: "string",
      required: true,
      clean: util.types.toString,
      comments: "The name of the lead",
    }),
    ownerId: input({
      label: "Owner ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of the user which will be the owner of the created lead",
    }),
    labelIds: input({
      label: "Label Ids",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The IDs of the lead labels which will be associated with the lead",
    }),
    personId: input({
      label: "Person ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of a person which this lead will be linked to",
    }),
    organizationId: input({
      label: "Organization ID",
      type: "string",
      required: false,
      clean: cleanNumber,
      comments: "The ID of an organization which this lead will be linked to",
    }),
    value: input({
      label: "Value",
      type: "string",
      required: false,
      clean: cleanString,
      comments: "The potential value of the lead",
    }),
    expectedCloseDate: input({
      label: "Expected Close Date",
      type: "string",
      required: false,
      clean: cleanString,
      comments:
        "The date of when the deal which will be created from the lead is expected to be closed",
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
      comments: "The visibility of the lead",
    }),
    wasSeen: input({
      label: "Was Seen",
      type: "boolean",
      required: false,
      clean: util.types.toBool,
      comments: "A flag indicating whether the lead was seen by someone in the Pipedrive UI",
    }),
  },
});
