import { action } from "@prismatic-io/spectral";
import createWorkItemInputs from "../../inputs/workitems/createWorkItem";
import { createKarbonClient } from "../../client";
import { cleanOdata } from "../../utils";
import { createWorkItemExamplePayload } from "../../examplePayloads";

export const createWorkItem = action({
  display: {
    label: "Create a Work Item",
    description: "Create a new Work Item",
  },
  inputs: {
    ...createWorkItemInputs,
  },
  perform: async (
    context,
    {
      connection,
      assigneeEmailAddres,
      title,
      clientKey,
      clientType,
      relatedClientGroupKey,
      startDate,
      additionalFields,
    },
  ) => {
    const client = createKarbonClient(connection, context.debug.enabled);
    const response = await client.post("/v3/WorkItems", {
      AssigneeEmailAddress: assigneeEmailAddres,
      Title: title,
      ClientKey: clientKey,
      ClientType: clientType,
      RelatedClientGroupKey: relatedClientGroupKey,
      StartDate: startDate,
      ...(additionalFields || {}),
    });
    return { data: cleanOdata(response.data) };
  },
  examplePayload: createWorkItemExamplePayload,
});
