import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  fieldValuesInput,
  instanceUrlInput,
  sysId,
} from "../../inputs";
import { updateTableRecord } from "../tables/records/updateTableRecord";

export const updateIncident = action({
  display: {
    label: "Update Incident",
    description:
      "Updates an Incident with the specified field names and values",
  },
  perform: async (context, parameters) => {
    return {
      data: await updateTableRecord.perform(context, {
        tableNameInput: "incident",
        ...parameters,
      }),
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    sysId,
    fieldValuesInput,
  },
});
