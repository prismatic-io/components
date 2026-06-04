import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createOnboardingRequestExamplePayload as examplePayload } from "../../examplePayloads";
import { createOnboardingRequestInputs as inputs } from "../../inputs/onboarding";

export const createOnboardingRequest = action({
  display: {
    label: "Create Onboarding Request",
    description: "Creates a new onboarding request in Freshservice.",
  },
  perform: async (
    context,
    {
      connection,
      cfEmployeeName,
      cfJobTitle,
      cfDateOfJoining,
      cfAllUsers,
      cfDepartment,
      cfAssets,
      cfLocation,
      cfHierarchy,
      cfVerified,
      onboardingAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);

    const payload = {
      fields: {
        cf_employee_name: cfEmployeeName,
        cf_job_title: cfJobTitle,
        cf_date_of_joining: cfDateOfJoining,
        cf_all_users: cfAllUsers,
        cf_department: cfDepartment,
        cf_assets: cfAssets,
        cf_location: cfLocation,
        cf_hierarchy: cfHierarchy,
        cf_verified: cfVerified,
        ...onboardingAdditionalFields,
      },
    };

    const { data } = await client.post(`/onboarding_requests`, payload);

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
