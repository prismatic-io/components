import { action, util } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updateUserExamplePayload } from "../../examplePayloads";
import { updateUserInputs } from "../../inputs";
import type { UpdateUserBody } from "../types/UpdateUserBody";
import type { UpdateUserQueryParams } from "../types/UpdateUserQueryParams";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Updates the specified user's attributes in a Domo instance.",
  },
  examplePayload: updateUserExamplePayload,
  perform: async (
    context,
    { connection, userId, email, name, role, roled, profile, updateUserBody },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: UpdateUserQueryParams = {};
    if (profile.alternateEmail.length)
      queryParams.alternateEmail = profile.alternateEmail;
    if (email.length) queryParams.email = email;
    if (profile.employeeNumber.length)
      queryParams.employeeNumber = profile.employeeNumber;
    if (profile.locale.length) queryParams.locale = profile.locale;
    if (profile.location.length) queryParams.location = profile.location;
    if (name.length) queryParams.name = name;
    if (profile.phone.length) queryParams.phone = profile.phone;
    if (role.length) queryParams.role = role;
    if (roled.length) queryParams.roled = util.types.toNumber(roled);
    if (profile.timezone.length) queryParams.timezone = profile.timezone;
    if (profile.title.length) queryParams.title = profile.title;

    let body = {};
    if (updateUserBody.length)
      body = JSON.parse(updateUserBody) as UpdateUserBody;

    const { data } = await client.put(`/users/${userId}`, body, {
      params: queryParams,
      headers: { "Content-Type": "application/json" },
    });
    return { data };
  },
  inputs: updateUserInputs,
});

export default { updateUser };
