import { action, outputSchema, PerformSafety } from "@prismatic-io/spectral";
import { createEmployeeInputs } from "../../inputs";
import { createClient } from "../../client";
import { createEmployeeExamplePayload } from "../../examplePayloads";
import { createEmployeeOutputSchema } from "../../outputSchemas";

export const createEmployee = action({
  display: {
    label: "Create Employee",
    description: "Creates an employee of a company.",
  },
  inputs: createEmployeeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createEmployeeOutputSchema,
  }),
  perform: async (context, params) => {
    if (params.selfOnboarding && !params.email) {
      throw new Error(
        "Email Address is required when Self Onboarding is enabled.",
      );
    }
    const client = createClient(params.connection, context.debug.enabled);
    const { data, headers } = await client.post(
      `/companies/${params.companyId}/employees`,
      {
        first_name: params.firstName,
        middle_initial: params.middleInitial,
        last_name: params.lastName,
        date_of_birth: params.dateOfBirth,
        email: params.email,
        ssn: params.ssn,
        self_onboarding: params.selfOnboarding,
        ...params.additionalFields,
      },
    );
    return { data: { data, headers } };
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePayload: createEmployeeExamplePayload,
});
