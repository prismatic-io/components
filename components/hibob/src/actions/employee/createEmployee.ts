import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { createEmployeeExamplePayload } from "../../examplePayloads";
import { createEmployeeInputs } from "../../inputs";

export const createEmployee = action({
  display: {
    label: "Create Employee",
    description: "Creates a new employee with the specified fields.",
  },
  perform: async (
    context,
    { connection, firstName, surname, email, site, startDate },
  ) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.post(`/people`, {
      work: {
        site,
        startDate,
      },
      firstName,
      surname,
      email,
    });
    return {
      data,
    };
  },
  inputs: createEmployeeInputs,
  examplePayload: createEmployeeExamplePayload,
});
