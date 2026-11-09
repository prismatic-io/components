import { action, outputSchema } from "@prismatic-io/spectral";
import { createDataManagerClient } from "../../client";
import { removeAudienceMembersExamplePayload } from "../../examplePayloads";
import { removeAudienceMembersInputs } from "../../inputs";
import { audienceMembersRequestOutputSchema } from "../../outputSchemas";
import { buildAudienceDestination } from "../../util";

export const removeAudienceMembers = action({
  display: {
    label: "Remove Audience Members",
    description:
      "Removes members from a Google Ads Customer Match audience through the Data Manager API and returns the request ID to check its status.",
  },
  inputs: removeAudienceMembersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: audienceMembersRequestOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customerId,
      audienceId,
      audienceMembers,
      managerCustomerId,
      encoding,
      validateOnly,
    },
  ) => {
    const client = createDataManagerClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
    });
    const { data } = await client.post("/audienceMembers:remove", {
      destinations: [
        buildAudienceDestination(customerId, audienceId, managerCustomerId),
      ],
      audienceMembers,
      encoding,
      validateOnly,
    });
    return { data };
  },
  examplePerform: async () => removeAudienceMembersExamplePayload,
  examplePayload: removeAudienceMembersExamplePayload,
});
