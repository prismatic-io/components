import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { createUserInputs } from "../../inputs";
import type { User } from "../types/User";
import { createUserExamplePayload } from "../../examplePayloads";

export const createUser = action({
  display: {
    label: "Create User",
    description: "Creates a new user in a Domo instance.",
  },
  examplePayload: createUserExamplePayload,
  perform: async (
    context,
    {
      connection,
      email,
      name,
      role,
      alternateEmail,
      employeeNumber,
      locale,
      location,
      phone,
      sendInvite,
      timezone,
      title,
      userBody,
    },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    let body = {};
    if (userBody.length) body = JSON.parse(userBody) as User;
    const { data } = await client.post(
      `/users?email=${email}&name=${name}&role=${role}
    ${alternateEmail.length ? `&alternateEmail=${alternateEmail}` : ""}
    ${employeeNumber.length ? `&employeeNumber=${employeeNumber}` : ""}
    ${locale.length ? `&locale=${locale}` : ""}
    ${location.length ? `&location=${location}` : ""}
    ${phone.length ? `&phone=${phone}` : ""}
    ${sendInvite.length ? `&sendInvite=${sendInvite}` : ""}
    ${timezone.length ? `&timezone=${timezone}` : ""}
    ${title.length ? `&title=${title}` : ""}`,
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
