import { action } from "@prismatic-io/spectral";
import { deleteIncidentInputs } from "../../inputs";
import { deleteTableRecord } from "../tables/records/deleteTableRecord";
export const deleteIncident = action({
  display: {
    label: "Delete Incident",
    description: "Delete an incident.",
  },
  performSafety: "notAllowed",
  perform: async (context, parameters) => {
    return {
      data: await deleteTableRecord.perform(context, {
        tableNameInput: "incident",
        ...parameters,
      }),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: null },
  }),
  inputs: deleteIncidentInputs,
});
