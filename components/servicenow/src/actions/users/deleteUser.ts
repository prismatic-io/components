import { action } from "@prismatic-io/spectral";
import { deleteUserInputs } from "../../inputs";
import { deleteTableRecord } from "../tables/records/deleteTableRecord";
export const deleteUser = action({
  display: {
    label: "Delete User",
    description: "Deletes a user.",
  },
  performSafety: "notAllowed",
  perform: async (context, parameters) => {
    return {
      data: await deleteTableRecord.perform(context, {
        tableNameInput: "sys_user",
        ...parameters,
      }),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: null },
  }),
  inputs: deleteUserInputs,
});
