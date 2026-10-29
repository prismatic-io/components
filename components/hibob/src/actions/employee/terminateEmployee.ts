import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { terminateEmployeeExamplePayload } from "../../examplePayloads";
import { terminateEmployeeInputs } from "../../inputs";

export const terminateEmployee = action({
  display: {
    label: "Terminate Employee",
    description:
      "Terminates a specific employee with a given termination date and reason.",
  },
  perform: async (
    context,
    {
      connection,
      identifier,
      terminationDate,
      terminationReason,
      reason,
      noticePeriod,
      lastDayOfWork,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    await client.post(`/employees/${identifier}/terminate`, {
      noticePeriod,
      lastDayOfWork,
      reasonType: reason,
      terminationReason,
      terminationDate,
    });
    return {
      data: {
        success: true,
        message: "Employee terminated successfully",
      },
    };
  },
  inputs: terminateEmployeeInputs,
  examplePayload: terminateEmployeeExamplePayload,
});
