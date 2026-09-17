import { action } from "@prismatic-io/spectral";
import { getUserInputs } from "../../inputs";
import { getTableRecord } from "../tables/records/getTableRecord";
export const getUser = action({
  display: {
    label: "Get User by ID",
    description: "Gets a user by ID.",
  },
  performSafety: "safe",
  perform: async (context, parameters) => {
    return {
      data: await getTableRecord.perform(context, {
        tableNameInput: "sys_user",
        ...parameters,
      }),
    };
  },
  inputs: getUserInputs,
});
