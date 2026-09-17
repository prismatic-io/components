import { action } from "@prismatic-io/spectral";
import { getIncidentInputs } from "../../inputs";
import { getTableRecord } from "../tables/records/getTableRecord";
export const getIncident = action({
  display: {
    label: "Get Incident",
    description: "Gets an incident by ID.",
  },
  performSafety: "safe",
  perform: async (context, parameters) => {
    return {
      data: await getTableRecord.perform(context, {
        tableNameInput: "incident",
        ...parameters,
      }),
    };
  },
  inputs: getIncidentInputs,
});
