import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll, limit, name, offset } from "./common";

export const userId = input({
  label: "User ID",
  comments: "The unique identifier for the Domo user.",
  type: "string",
  required: true,
  placeholder: "Enter User ID",
  example: "959463190",
  dataSource: "selectUser",
  clean: util.types.toString,
});

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  comments: "The primary email address associated with the Domo user profile.",
  placeholder: "Enter email address",
  example: "john.doe@example.com",
  clean: util.types.toString,
});

export const role = input({
  label: "Role",
  type: "string",
  required: true,
  comments:
    "The permission level assigned to the user (Admin, Privileged, or Participant).",
  default: "Admin",
  placeholder: "Select role",
  model: [
    {
      label: "Admin",
      value: "Admin",
    },
    {
      label: "Privileged",
      value: "Privileged",
    },
    {
      label: "Participant",
      value: "Participant",
    },
  ],
  clean: util.types.toString,
});

export const roled = input({
  label: "Roled",
  type: "string",
  required: false,
  comments:
    "The unique identifier for the custom or system role assigned to the user.",
  placeholder: "Enter role ID",
  example: "123",
  clean: util.types.toString,
});

export const alternateEmail = input({
  label: "Alternate Email",
  type: "string",
  required: false,
  comments:
    "The secondary email address associated with the Domo user profile.",
  placeholder: "Enter alternate email address",
  example: "john.doe.alternate@example.com",
  clean: util.types.toString,
});

export const employeeNumber = input({
  label: "Employee Number",
  type: "string",
  required: false,
  comments: "The employee identification number within the organization.",
  placeholder: "Enter employee number",
  example: "23432",
  clean: util.types.toString,
});

export const locale = input({
  label: "Locale",
  type: "string",
  required: false,
  comments:
    "The locale code used to display system settings throughout the Domo application.",
  placeholder: "Enter locale",
  example: "en_US",
  clean: util.types.toString,
});

export const location = input({
  label: "Location",
  type: "string",
  required: false,
  comments: "The office location or geographic area for the user profile.",
  placeholder: "Enter location",
  example: "American Fork",
  clean: util.types.toString,
});

export const phone = input({
  label: "Phone",
  type: "string",
  required: false,
  comments: "The primary phone number for the Domo user profile.",
  placeholder: "Enter phone number",
  example: "888-361-1078",
  clean: util.types.toString,
});

export const sendInvite = input({
  label: "Send Invite",
  type: "string",
  required: false,
  comments: "When true, sends an email invitation to the newly created user.",
  placeholder: "Enter true or false",
  example: "true",
  clean: util.types.toString,
});

export const timezone = input({
  label: "Timezone",
  type: "string",
  required: false,
  comments:
    "The IANA timezone identifier used to display system times throughout the Domo application.",
  placeholder: "Enter timezone",
  example: "America/Denver",
  clean: util.types.toString,
});

export const title = input({
  label: "Title",
  type: "string",
  required: false,
  comments: "The job title for the Domo user profile.",
  placeholder: "Enter job title",
  example: "Software Engineer",
  clean: util.types.toString,
});

export const userBody = input({
  label: "User Body",
  type: "code",
  language: "json",
  required: false,
  comments: "The user object to create.",
  example: JSON.stringify(
    {
      title: "Software Engineer",
      email: "leonhard.euler@domo.com",
      alternateEmail: "leonhardeuler@email.com",
      role: "Admin",
      phone: "888-361-1078",
      name: "Leonhard Euler",
      location: "American Fork",
      timezone: "America/Denver",
      locale: "en_US",
      employeeNumber: 23432,
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

export const updateUserBody = input({
  label: "Update User Body",
  type: "code",
  language: "json",
  required: false,
  comments: "The user object to update.",
  example: JSON.stringify(
    {
      email: "leonhard.euler@domo.com",
      role: "Admin",
      name: "Leonhard Euler",
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

export const createUserInputs = {
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
};

export const deleteUserInputs = {
  connection,
  userId,
};

export const getUserInputs = {
  connection,
  userId,
};

export const listUsersInputs = {
  connection,
  fetchAll,
  limit: input({
    ...limit,
    required: false,
    comments:
      "The amount of users to return in the list. The default is 50 and the maximum is 500.",
  }),
  offset: input({
    ...offset,
    required: false,
    comments:
      "The offset of the user ID to begin list of users within the response.",
  }),
};

export const updateUserInputs = {
  connection,
  userId,
  email: input({ ...email, required: false }),
  name: input({ ...name, required: false, comments: "User's full name" }),
  role: input({
    ...role,
    required: false,
    comments: "The system role of the user",
  }),
  alternateEmail,
  employeeNumber,
  locale,
  location,
  phone,
  roled,
  timezone,
  title,
  updateUserBody,
};
