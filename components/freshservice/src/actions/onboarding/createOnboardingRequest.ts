import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createOnboardingRequestExamplePayload as examplePayload } from "../../examplePayloads";
import { createOnboardingRequestInputs as inputs } from "../../inputs";
import { createOnboardingRequestOutputSchema } from "../../outputSchemas";
export const createOnboardingRequest = action({
  display: {
    label: "Create Onboarding Request",
    description: "Creates a new onboarding request in Freshservice.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      cfEmployeeName,
      cfJobTitle,
      cfDateOfJoining,
      cfAllUsers,
      cfDepartment,
      additionalFields,
      onboardingAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const payload = {
      fields: {
        cf_employee_name: cfEmployeeName,
        cf_job_title: cfJobTitle,
        cf_date_of_joining: cfDateOfJoining,
        cf_all_users: cfAllUsers,
        cf_department: cfDepartment,
        cf_assets: additionalFields.cfAssets,
        cf_location: additionalFields.cfLocation,
        cf_hierarchy: additionalFields.cfHierarchy,
        cf_verified: additionalFields.cfVerified,
        ...onboardingAdditionalFields,
      },
    };
    const { data } = await client.post(`/onboarding_requests`, payload);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createOnboardingRequestOutputSchema,
  }),
  inputs,
  examplePayload,
});
