import { action } from "@prismatic-io/spectral";
import { createIncidentInputs } from "../../inputs";
import { createTableRecord } from "../tables/records/createTableRecord";
export const createIncident = action({
  display: {
    label: "Create Incident",
    description:
      "Creates an Incident with the specified field names and values",
  },
  performSafety: "notAllowed",
  perform: async (context, parameters) => {
    return {
      data: await createTableRecord.perform(context, {
        tableNameInput: "incident",
        ...parameters,
      }),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: {} },
  }),
  inputs: createIncidentInputs,
});
