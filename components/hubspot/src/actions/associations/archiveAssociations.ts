import { action, outputSchema } from "@prismatic-io/spectral";
import { archiveAssociationsOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { archiveAssociationsExamplePayload } from "../../examplePayloads";
import { archiveAssociationsInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";
import { resolveAssociationSpec } from "../../util";

export const archiveAssociations = action({
  display: {
    label: "Archive Association",
    description:
      "Remove the associations between two provided objects. Deleting an unlabeled association also deletes all labeled associations between those two objects.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      fromObjectType,
      toObjectType,
      fromId,
      toId,
      associateType,
      timeout,
      hubspotConnection,
    },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const spec = await resolveAssociationSpec(
      client,
      fromObjectType,
      toObjectType,
      associateType,
    );

    const { data } = await client.post(
      hubspotPaths.associations(
        fromObjectType,
        toObjectType,
        "/batch/labels/archive",
      ),
      {
        inputs: [
          {
            from: {
              id: fromId,
            },
            to: {
              id: toId,
            },
            types: [spec],
          },
        ],
      },
    );

    return { data };
  },
  examplePerform: async () => ({
    data: archiveAssociationsExamplePayload.data,
  }),
  inputs: archiveAssociationsInputs,
  examplePayload: archiveAssociationsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: archiveAssociationsOutputSchema,
  }),
});
