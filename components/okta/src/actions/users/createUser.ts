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
      answer,
      department,
      email,
      employeeNumber,
      firstName,
      hashPassword,
      lastName,
      locale,
      login,
      mobilePhone,
      password,
      profileExtraInputs,
      question,
      realmId,
      groupIds,
      providerName,
      providerType,
      type,
      nextLogin,
      provider,
      activate,
    },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const body = {
      profile: {
        firstName,
        lastName,
        email,
        login,
        mobilePhone,
        department,
        employeeNumber,
        locale,
        ...(profileExtraInputs ? profileExtraInputs : {}),
      },
      credentials: {
        password: password ? { value: password, hash: hashPassword } : undefined,
        recovery_question: question && answer ? { question, answer } : undefined,
        provider:
          providerName && providerType ? { name: providerName, type: providerType } : undefined,
      },
      realmId,
      groupIds,
      type: type ? { id: type } : undefined,
    };
    const { data } = await client.post<User>(`/users`, body, {
      params: { nextLogin, provider, activate },
    });

    return { data };
  },
  examplePayload: createUserExamplePayload,
});
