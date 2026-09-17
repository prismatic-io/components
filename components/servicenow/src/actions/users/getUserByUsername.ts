import { action } from "@prismatic-io/spectral";
import { getUserByUsernameInputs } from "../../inputs";
import { listUsers } from "./listUsers";
export const getUserByUsername = action({
  display: {
    label: "Get User by Username",
    description: "Retrieve a user by username.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, instanceUrlInput, apiVersionInput, userName },
  ) => {
    return await listUsers.perform(context, {
      connection,
      fetchAll: false,
      apiVersionInput: apiVersionInput,
      instanceUrlInput: instanceUrlInput,
      pagination: {
        sysparmLimit: undefined,
        sysparmOffset: undefined,
      },
      sysparmQuery: `user_name=${userName}`,
    });
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: [] },
  }),
  inputs: getUserByUsernameInputs,
});
