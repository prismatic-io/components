import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createUserExamplePayload } from "../../examplePayloads";
import { createUserInputs } from "../../inputs";
import type { User } from "../types/User";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Creates a new user in a Domo instance.",
  },
  examplePayload: createUserExamplePayload,
  perform: async (
    context,
    { connection, email, name, role, sendInvite, profile, userBody },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    let body = {};
    if (userBody.length) body = JSON.parse(userBody) as User;
    const { data } = await client.post(
      `/users?email=${email}&name=${name}&role=${role}
    ${profile.alternateEmail.length ? `&alternateEmail=${profile.alternateEmail}` : ""}
    ${profile.employeeNumber.length ? `&employeeNumber=${profile.employeeNumber}` : ""}
    ${profile.locale.length ? `&locale=${profile.locale}` : ""}
    ${profile.location.length ? `&location=${profile.location}` : ""}
    ${profile.phone.length ? `&phone=${profile.phone}` : ""}
    ${sendInvite.length ? `&sendInvite=${sendInvite}` : ""}
    ${profile.timezone.length ? `&timezone=${profile.timezone}` : ""}
    ${profile.title.length ? `&title=${profile.title}` : ""}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return { data };
  },
  inputs: createUserInputs,
});

export default { createUser };
