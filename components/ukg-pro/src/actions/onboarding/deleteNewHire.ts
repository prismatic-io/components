import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteNewHireExamplePayload } from "../../examplePayloads";
import { deleteNewHireInputs } from "../../inputs";
import { getTenantIdentifier } from "../../util";







export const deleteNewHire = action({
  display: {
    label: "Delete New Hire",
    description: "Delete a new hire record from the onboarding system.",
  },
  inputs: deleteNewHireInputs,
  perform: async (context, { connection, newHireId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const tenantIdentifier = getTenantIdentifier(connection);

    const { data } = await client.delete(
      `/talent/onboarding/v2/tenants/${tenantIdentifier}/new-hires/${newHireId}`,
    );

    return {
      data: data || {
        success: true,
        message: `New hire ${newHireId} has been deleted.`,
      },
    };
  },
  examplePayload: deleteNewHireExamplePayload,
});
