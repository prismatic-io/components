import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  email,
  fieldValuesInputNonRequired,
  firstName,
  instanceUrlInput,
  lastName,
  sysId,
  userName,
} from "../../inputs";
import { updateTableRecord } from "../tables/records/updateTableRecord";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Updates a User with the specified field names and values",
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
      sysId,
    },
  ) => {
    const updateFields = [
      ...(fieldValuesInputNonRequired ? fieldValuesInputNonRequired : []),
      { key: "user_name", value: userName },
      { key: "first_name", value: firstName },
      { key: "last_name", value: lastName },
      { key: "email", value: email },
    ];
    return {
      data: await updateTableRecord.perform(context, {
        connection,
        tableNameInput: "sys_user",
        apiVersionInput,
        instanceUrlInput,
        sysId,
        fieldValuesInput: updateFields,
      }),
    };
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    sysId,
    fieldValuesInputNonRequired,
    userName,
    email,
    firstName,
    lastName,
  },
});
