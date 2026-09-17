import { action } from "@prismatic-io/spectral";
import { createUserInputs } from "../../inputs";
import { createTableRecord } from "../tables/records/createTableRecord";
export const createUser = action({
  display: {
    label: "Create User",
    description: "Creates a user with the specified field names and values.",
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
    },
  ) => {
    const fieldValuesInput = [
      ...(fieldValuesInputNonRequired ? fieldValuesInputNonRequired : []),
      { key: "user_name", value: userName },
      { key: "first_name", value: contactInfo.firstName },
      { key: "last_name", value: contactInfo.lastName },
      { key: "email", value: contactInfo.email },
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { result: {} },
  }),
  inputs: createUserInputs,
});
