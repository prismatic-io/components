import { action } from "@prismatic-io/spectral";
import { updateUserInputs } from "../../inputs";
import { updateTableRecord } from "../tables/records/updateTableRecord";
export const updateUser = action({
  display: {
    label: "Update User",
    description: "Updates a user with the specified field names and values.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      fieldValuesInputNonRequired,
      userName,
      contactInfo,
      instanceUrlInput,
      apiVersionInput,
      sysId,
    },
  ) => {
    const updateFields = [
      ...(fieldValuesInputNonRequired ? fieldValuesInputNonRequired : []),
      { key: "user_name", value: userName },
      { key: "first_name", value: contactInfo.firstName },
      { key: "last_name", value: contactInfo.lastName },
      { key: "email", value: contactInfo.email },
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: {} },
  }),
  inputs: updateUserInputs,
});
