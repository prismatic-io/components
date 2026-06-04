import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  fieldValuesInput,
  instanceUrlInput,
} from "../../inputs";
import { createTableRecord } from "../tables/records/createTableRecord";

export const createIncident = action({
  display: {
    label: "Create Incident",
    description:
      "Creates an Incident with the specified field names and values",
  },
  perform: async (context, parameters) => {
    return {
      data: await createTableRecord.perform(context, {
        tableNameInput: "incident",
        ...parameters,
      }),
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    fieldValuesInput,
  },
});
