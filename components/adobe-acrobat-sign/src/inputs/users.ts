import { input, util } from "@prismatic-io/spectral";
import {
  accountId,
  company,
  connection,
  cursor,
  email,
  fetchAll,
  filterQuery,
  firstName,
  lastName,
  locale,
  pageSize,
  phone,
  title,
} from "./common";

const isAccountAdmin = input({
  label: "Account Admin",
  type: "boolean",
  required: true,
  comments: "When true, the user is an account admin.",
  clean: util.types.toBool,
});

const initials = input({
  label: "Initials",
  type: "string",
  required: false,
  placeholder: "Enter initials",
  example: "JD",
  comments: "The initials of the user.",
  clean: util.types.toString,
});

const userId = input({
  label: "User ID",
  type: "string",
  required: false,
  placeholder: "Enter User ID",
  example: "CBJCHBCAABAApRvVMBVyo0bIo4jdPROKiKWR9xRhRugJ",
  comments:
    "The user identifier, as returned by the user creation API or retrieved from the API to fetch users.",
  dataSource: "selectUsers",
  clean: util.types.toString,
});

const userStatus = input({
  label: "Status",
  type: "string",
  required: false,
  placeholder: "Select status",
  clean: util.types.toString,
  model: ["ACTIVE", "INACTIVE"].map((options) => {
    return {
      value: options,
      label: options,
    };
  }),
  comments: "Status of the user.",
});

export const createUserInputs = {
  connection,
  email,
  isAccountAdmin,
  company,
  firstName,
  lastName,
  initials,
  locale,
  phone,
  title,
  accountId,
};

export const getUserInputs = {
  connection,
  userId: {
    ...userId,
    required: true,
  },
};

export const listUsersInputs = {
  connection,
  fetchAll,
  cursor,
  pageSize,
};

export const updateUserInputs = {
  connection,
  email,
  company,
  firstName,
  lastName,
  initials,
  locale,
  phone,
  title,
  userId,
  userStatus,
};

export const selectUsersInputs = {
  connection,
  filterQuery,
};
