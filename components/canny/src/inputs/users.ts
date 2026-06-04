import { input, util } from "@prismatic-io/spectral";
import { toOptionalObject, toOptionalString } from "../util";
import {
  additionalFields,
  connection,
  cursor,
  customFields,
  fetchAll,
  limit,
} from "./common";

const userId = input({
  label: "User ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the user.",
  clean: util.types.toString,
  dataSource: "selectUser",
  placeholder: "Enter user ID",
  example: "553c3ef8b8cdcd1501ba9999",
});

const userEmail = input({
  label: "Email",
  type: "string",
  required: true,
  comments: "The user's email address.",
  clean: util.types.toString,
  placeholder: "Enter email",
  example: "jane@example.com",
});

const userName = input({
  label: "Name",
  type: "string",
  required: false,
  comments: "The user's display name.",
  clean: toOptionalString,
  placeholder: "Enter name",
  example: "Jane Smith",
});

export const listUsersInputs = { connection, fetchAll, cursor, limit };

export const retrieveUserInputs = { connection, userId };

const companies = input({
  label: "Companies",
  type: "code",
  language: "json",
  required: false,
  comments: "JSON array of company objects to associate with the user.",
  clean: toOptionalObject,
  placeholder: "Enter companies",
  example: JSON.stringify(
    [
      {
        created: "2026-04-15T22:51:00.528Z",
        customFields: { field1: "value1", field2: "value2" },
        id: "company123",
        monthlySpend: 500.0,
        name: "company name",
      },
    ],
    null,
    2,
  ),
});

export const createOrUpdateUserInputs = {
  connection,
  userEmail,
  userName,
  userId: { ...userId, required: false, clean: toOptionalString },
  companies,
  customFields,
  additionalFields,
};

export const deleteUserInputs = { connection, userId };

export const selectUserInputs = { connection };
