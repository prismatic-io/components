import { input, util } from "@prismatic-io/spectral";

export const ouUserDn = input({
  label: "OU User DN",
  type: "string",
  required: true,
  comments: "The DN of the user to move.",
  example: "cn=user,ou=users,dc=example,dc=com",
  placeholder: "Enter user DN",
  clean: util.types.toString,
  dataSource: "selectUser",
});

export const newOuUserDn = input({
  label: "New OU User DN",
  type: "string",
  required: true,
  comments: "The new DN for the user.",
  example: "cn=user,ou=admins,dc=example,dc=com",
  placeholder: "Enter new user DN",
  clean: util.types.toString,
});

export const userToUpdate = input({
  label: "User to Update",
  type: "string",
  required: true,
  comments: "The DN of the user to update.",
  example: "cn=user,ou=users,dc=example,dc=com",
  placeholder: "Enter user DN",
  clean: util.types.toString,
  dataSource: "selectUser",
});

export const userDn = input({
  label: "User DN",
  type: "string",
  required: true,
  comments: "The DN of the user to set the password for.",
  example: "cn=user,ou=users,dc=example,dc=com",
  placeholder: "Enter user DN",
  clean: util.types.toString,
  dataSource: "selectUser",
});

export const newPassword = input({
  label: "New Password",
  type: "password",
  required: true,
  comments: "The new password for the user.",
  example: "newpassword",
  placeholder: "Enter new password",
  clean: util.types.toString,
});

export const userDnToAdd = input({
  label: "User DN to Add",
  type: "string",
  required: true,
  comments: "The DN of the user to add to the group.",
  example: "cn=user,ou=users,dc=example,dc=com",
  placeholder: "Enter user DN",
  clean: util.types.toString,
  dataSource: "selectUser",
});

export const userDnToRemove = input({
  label: "User DN to Remove",
  type: "string",
  required: true,
  comments: "The DN of the user to remove from the group.",
  example: "cn=user,ou=users,dc=example,dc=com",
  placeholder: "Enter user DN",
  clean: util.types.toString,
  dataSource: "selectUser",
});

export const userName = input({
  label: "User Name",
  type: "string",
  required: true,
  comments: "The name of the user to add.",
  example: "New User",
  placeholder: "Enter user name",
  clean: util.types.toString,
});

export const userPrincipalName = input({
  label: "User Principal Name",
  type: "string",
  required: true,
  comments: "The user principal name of the user to add.",
  example: "user@example.com",
  placeholder: "Enter user principal name",
  clean: util.types.toString,
});

export const password = input({
  label: "Password",
  type: "password",
  required: true,
  comments: "The password of the user to add.",
  example: "password",
  placeholder: "Enter password",
  clean: util.types.toString,
});

export const sAMAccountName = input({
  label: "sAMAccountName",
  type: "string",
  required: true,
  comments: "The sAMAccountName of the user to add.",
  example: "newuser",
  placeholder: "Enter sAMAccountName",
  clean: util.types.toString,
});
