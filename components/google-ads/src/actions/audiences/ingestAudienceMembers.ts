import { action, outputSchema } from "@prismatic-io/spectral";
import { createDataManagerClient } from "../../client";
import { ingestAudienceMembersExamplePayload } from "../../examplePayloads";
import { ingestAudienceMembersInputs } from "../../inputs";
import { audienceMembersRequestOutputSchema } from "../../outputSchemas";
import { buildAudienceDestination, buildConsent } from "../../util";

export const ingestAudienceMembers = action({
  display: {
    label: "Ingest Audience Members",
    description:
      "Adds members to a Google Ads Customer Match audience through the Data Manager API and returns the request ID to check its status.",
  },
  inputs: ingestAudienceMembersInputs,
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
      customerMatchTermsOfService,
      managerCustomerId,
      encoding,
      adUserDataConsent,
      adPersonalizationConsent,
      validateOnly,
    },
  ) => {
    const client = createDataManagerClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
    });
    const { data } = await client.post("/audienceMembers:ingest", {
      destinations: [
        buildAudienceDestination(customerId, audienceId, managerCustomerId),
      ],
      audienceMembers,
      encoding,
      consent: buildConsent(adUserDataConsent, adPersonalizationConsent),
      termsOfService: {
        customerMatchTermsOfServiceStatus: customerMatchTermsOfService,
      },
      validateOnly,
    });
    return { data };
  },
  examplePerform: async () => ingestAudienceMembersExamplePayload,
  examplePayload: ingestAudienceMembersExamplePayload,
});
