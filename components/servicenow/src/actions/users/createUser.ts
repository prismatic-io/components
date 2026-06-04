import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  email,
  fieldValuesInputNonRequired,
  firstName,
  instanceUrlInput,
  lastName,
  userName,
} from "../../inputs";
import { createTableRecord } from "../tables/records/createTableRecord";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Creates a User with the specified field names and values",
  },
  perform: async (
    context,
    {
      connection,
      fieldValuesInputNonRequired,
      userName,
      email,
      firstName,
      lastName,
      instanceUrlInput,
      apiVersionInput,
    },
  ) => {
    const fieldValuesInput = [
      ...(fieldValuesInputNonRequired ? fieldValuesInputNonRequired : []),
      { key: "user_name", value: userName },
      { key: "first_name", value: firstName },
      { key: "last_name", value: lastName },
      { key: "email", value: email },
    ];
    return {
      data: await createTableRecord.perform(context, {
        connection,
        tableNameInput: "sys_user",
        apiVersionInput,
        instanceUrlInput,
        fieldValuesInput,
      }),
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    fieldValuesInputNonRequired,
    firstName,
    lastName,
    email,
    userName,
  },
});
