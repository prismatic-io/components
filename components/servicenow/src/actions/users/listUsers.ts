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

export const listUsers = action({
  display: {
    label: "List Users",
    description: "Gets a list of all Users",
  },
  perform: async (context, parameters) => {
    return {
      data: await listTableRecords.perform(context, {
        tableNameInput: "sys_user",
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
