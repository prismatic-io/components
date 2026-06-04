import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysId,
} from "../../inputs";
import { deleteTableRecord } from "../tables/records/deleteTableRecord";

export const deleteIncident = action({
  display: {
    label: "Delete Incident",
    description: "Delete an Incident",
  },
  perform: async (context, parameters) => {
    return {
      data: await deleteTableRecord.perform(context, {
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
  },
});
