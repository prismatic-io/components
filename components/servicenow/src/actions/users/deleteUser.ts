import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  sysId,
} from "../../inputs";
import { deleteTableRecord } from "../tables/records/deleteTableRecord";

export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Deletes a User",
  },
  perform: async (context, parameters) => {
    return {
      data: await deleteTableRecord.perform(context, {
        tableNameInput: "sys_user",
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
