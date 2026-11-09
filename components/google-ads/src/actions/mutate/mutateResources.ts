import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { mutateResourcesExamplePayload } from "../../examplePayloads";
import { mutateResourcesInputs } from "../../inputs";
import { mutateResourcesOutputSchema } from "../../outputSchemas";

export const mutateResources = action({
  display: {
    label: "Mutate Resources",
    description:
      "Creates, updates, or removes any Google Ads resources in one request, linking new resources to each other through temporary IDs.",
  },
  inputs: mutateResourcesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: mutateResourcesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customerId,
      mutateOperations,
      partialFailure,
      managerCustomerId,
      validateOnly,
      responseContentType,
    },
  ) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
    });
    const { data } = await client.post(
      `/customers/${customerId}/googleAds:mutate`,
      {
        mutateOperations,
        partialFailure,
        validateOnly,
        responseContentType,
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    mutateResourcesExamplePayload,
  examplePayload: mutateResourcesExamplePayload,
});
