import { action } from "@prismatic-io/spectral";
import { listUsersInputs } from "../../inputs";
import { listTableRecords } from "../tables/records/listTableRecords";
export const listUsers = action({
  display: {
    label: "List Users",
    description: "Gets a list of all users.",
  },
  performSafety: "notAllowed",
  perform: async (context, parameters) => {
    return {
      data: await listTableRecords.perform(context, {
        tableNameInput: "sys_user",
        ...parameters,
      }),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: [] },
  }),
  inputs: listUsersInputs,
});
