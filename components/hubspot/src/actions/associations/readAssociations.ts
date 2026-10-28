import { action, outputSchema } from "@prismatic-io/spectral";
import { readAssociationsOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { readAssociationsExamplePayload } from "../../examplePayloads";
import { readAssociationsInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";
import { mapReadAssociations } from "../../util";
export const readAssociations = action({
  display: {
    label: "Read Association",
    description:
      "Get the Ids of the objects associated with those specified in the step.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { fromObjectType, toObjectType, fromId, timeout, hubspotConnection },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const { data } = await client.post(
      hubspotPaths.associations(fromObjectType, toObjectType, "/batch/read"),
      {
        inputs: [
          {
            id: fromId,
          },
        ],
      },
    );
    return { data: mapReadAssociations(data) };
  },
  inputs: readAssociationsInputs,
  examplePayload: readAssociationsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: readAssociationsOutputSchema,
  }),
});
