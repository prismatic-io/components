import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { EMPLOYEE_UPDATE_SETTINGS, JOB_TYPES } from "../../constants";
import { updateEmployeeExamplePayload } from "../../examplePayloads";
import { updateEmployeeInputs } from "../../inputs";
import { updateEmployeeOutputSchema } from "../../outputSchemas";
import { generatePayload } from "../../util";

export const updateEmployee = action({
  display: {
    description: "Add, update or remove policy members.",
    label: "Update Employee",
  },
  inputs: updateEmployeeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateEmployeeOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connectionInput, type, provisioningOptions, onFinish, employees },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      type: JOB_TYPES.UPDATE,
      inputSettings: {
        type,
        entity: EMPLOYEE_UPDATE_SETTINGS.ENTITY,
      },
      dataSource: EMPLOYEE_UPDATE_SETTINGS.DATA_SOURCE,
      "dry-run": provisioningOptions.dryRun,
      onFinish,
      setEmployeePrimaryPolicy: provisioningOptions.setEmployeePrimaryPolicy,
      shouldFixApprovalChains: provisioningOptions.shouldFixApprovalChains,
      employees,
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePerform: async () => updateEmployeeExamplePayload,
  examplePayload: updateEmployeeExamplePayload,
});
