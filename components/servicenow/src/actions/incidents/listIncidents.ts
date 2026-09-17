import { action } from "@prismatic-io/spectral";
import { listIncidentsInputs } from "../../inputs";
import { listTableRecords } from "../tables/records/listTableRecords";
export const listIncidents = action({
  display: {
    label: "List Incidents",
    description: "Gets a list of all incidents.",
  },
  performSafety: "notAllowed",
  perform: async (context, parameters) => {
    return {
      data: await listTableRecords.perform(context, {
        tableNameInput: "incident",
        ...parameters,
      }),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: [] },
  }),
  inputs: listIncidentsInputs,
});
