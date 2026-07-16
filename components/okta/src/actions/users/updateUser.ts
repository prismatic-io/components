import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateUserExamplePayload } from "../../examplePayloads/users";
import { updateUserInputs } from "../../inputs/users";
import type { User } from "../../interfaces/user";
export const updateUser = action({
  display: {
    label: "Update User",
    description: "Update a user by ID or login.",
  },
  inputs: updateUserInputs,
  perform: async (
    context,
    {
      connection,
      id,
      login,
      email,
      firstName,
      lastName,
      realmId,
      additionalFields = {},
    },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const { password, question, answer, hashPassword } = additionalFields;
    const credentials =
      password || (question && answer)
        ? {
            password: password
              ? { value: password, hash: hashPassword }
              : undefined,
            recovery_question:
              question && answer ? { question, answer } : undefined,
          }
        : undefined;
    const updatedBody: Record<string, unknown> = {
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
      credentials,
      realmId,
    };
    const { data } = await client.post<User>(
      `/users/${encodeURIComponent(id)}`,
      updatedBody,
    );
    return { data };
  },
  examplePayload: updateUserExamplePayload,
});
