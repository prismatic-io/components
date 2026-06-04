import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  fetchAll,
  instanceUrlInput,
  sysparmLimit,
  sysparmOffset,
  sysparmQuery,
} from "../../inputs";
import { listTableRecords } from "../tables/records/listTableRecords";

export const listIncidents = action({
  display: {
    label: "List Incidents",
    description: "Gets a list of all Incidents",
  },
  perform: async (context, parameters) => {
    return {
      data: await listTableRecords.perform(context, {
        tableNameInput: "incident",
        ...parameters,
      }),
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    sysparmQuery,
    fetchAll,
    sysparmLimit,
    sysparmOffset,
  },
});
