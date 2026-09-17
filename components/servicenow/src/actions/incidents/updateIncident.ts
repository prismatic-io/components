import { action } from "@prismatic-io/spectral";
import { updateIncidentInputs } from "../../inputs";
import { updateTableRecord } from "../tables/records/updateTableRecord";
export const updateIncident = action({
  display: {
    label: "Update Incident",
    description:
      "Updates an Incident with the specified field names and values",
  },
  performSafety: "notAllowed",
  perform: async (context, parameters) => {
    return {
      data: await updateTableRecord.perform(context, {
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
  inputs: updateIncidentInputs,
});
