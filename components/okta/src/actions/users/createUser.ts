import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createUserExamplePayload } from "../../examplePayloads/users";
import { createUserInputs } from "../../inputs/users";
import type { User } from "../../interfaces/user";
export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user.",
  },
  inputs: createUserInputs,
  perform: async (
    context,
    {
      connection,
      email,
      firstName,
      lastName,
      login,
      realmId,
      groupIds,
      provisioningOptions = {},
      additionalFields = {},
    },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const body = {
      profile: {
        firstName,
        lastName,
        email,
        login,
        mobilePhone: additionalFields.mobilePhone,
        department: additionalFields.department,
        employeeNumber: additionalFields.employeeNumber,
        locale: additionalFields.locale,
        ...(additionalFields.profileExtraInputs
          ? additionalFields.profileExtraInputs
          : {}),
      },
      credentials: {
        password: additionalFields.password
          ? {
              value: additionalFields.password,
              hash: additionalFields.hashPassword,
            }
          : undefined,
        recovery_question:
          additionalFields.question && additionalFields.answer
            ? {
                question: additionalFields.question,
                answer: additionalFields.answer,
              }
            : undefined,
        provider:
          additionalFields.providerName && additionalFields.providerType
            ? {
                name: additionalFields.providerName,
                type: additionalFields.providerType,
              }
            : undefined,
      },
      realmId,
      groupIds,
      type: additionalFields.type ? { id: additionalFields.type } : undefined,
    };
    const { data } = await client.post<User>(`/users`, body, {
      params: {
        nextLogin: provisioningOptions.nextLogin,
        provider: provisioningOptions.provider,
        activate: provisioningOptions.activate,
      },
    });
    return { data };
  },
  examplePayload: createUserExamplePayload,
});
