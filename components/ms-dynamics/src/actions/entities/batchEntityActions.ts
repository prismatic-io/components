import { action, util } from "@prismatic-io/spectral";
import { createCrmClient } from "../../client";
import { batchEntityActionsExamplePayload } from "../../examplePayloads";
import { batchEntityActionsInputs } from "../../inputs";

export const batchEntityActions = action({
  display: {
    label: "Run Batch Operations",
    description:
      "Performs multiple create, update, or delete operations on Microsoft Dynamics 365 CRM entity records.",
  },
  inputs: batchEntityActionsInputs,
  examplePayload: batchEntityActionsExamplePayload,
  perform: async (context, params) => {
    const client = await createCrmClient(params.connection, context.debug.enabled);
    client.startBatch();
    for (const action of params.actions) {
      if (action.action === "create") {
        client.create({
          data: action.data,
          collection: action.collection,
          returnRepresentation: util.types.toBool(action.returnRepresentation),
        });
      }
      if (action.action === "update") {
        client.update({
          key: action.key,
          collection: action.collection,
          data: action.data,
          returnRepresentation: util.types.toBool(action.returnRepresentation),
        });
      }
      if (action.action === "delete") {
        client.deleteRecord({ key: action.key, collection: action.collection });
      }
    }
    const result = await client.executeBatch();
    return { data: result };
  },
});
