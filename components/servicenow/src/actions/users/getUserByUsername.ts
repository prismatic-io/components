import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  userName,
} from "../../inputs";
import { listUsers } from "./listUsers";

export const getUserByUsername = action({
  display: {
    label: "Get User by Username",
    description: "Get a record for a given ID in the specified Table",
  },
  perform: async (
    context,
    { connection, instanceUrlInput, apiVersionInput, userName },
  ) => {
    return await listUsers.perform(context, {
      connection,
      fetchAll: false,
      apiVersionInput: apiVersionInput,
      instanceUrlInput: instanceUrlInput,
      sysparmLimit: undefined,
      sysparmOffset: undefined,
      sysparmQuery: `user_name=${userName}`,
    });
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    userName,
  },
});
