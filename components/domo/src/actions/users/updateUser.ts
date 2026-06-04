import { action, util } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updateUserInputs } from "../../inputs";
import type { UpdateUserBody } from "../types/UpdateUserBody";
import type { UpdateUserQueryParams } from "../types/UpdateUserQueryParams";
import { updateUserExamplePayload } from "../../examplePayloads";

export const updateUser = action({
  display: {
    label: "Update User",
    description: "Updates the specified user's attributes in a Domo instance.",
  },
  examplePayload: updateUserExamplePayload,
  perform: async (
    context,
    {
      connection,
      userId,
      alternateEmail,
      email,
      employeeNumber,
      locale,
      location,
      name,
      phone,
      role,
      roled,
      timezone,
      title,
      updateUserBody,
    },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: UpdateUserQueryParams = {};
    if (alternateEmail.length) queryParams.alternateEmail = alternateEmail;
    if (email.length) queryParams.email = email;
    if (employeeNumber.length) queryParams.employeeNumber = employeeNumber;
    if (locale.length) queryParams.locale = locale;
    if (location.length) queryParams.location = location;
    if (name.length) queryParams.name = name;
    if (phone.length) queryParams.phone = phone;
    if (role.length) queryParams.role = role;
    if (roled.length) queryParams.roled = util.types.toNumber(roled);
    if (timezone.length) queryParams.timezone = timezone;
    if (title.length) queryParams.title = title;

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
