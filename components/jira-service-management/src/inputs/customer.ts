import { input, util } from "@prismatic-io/spectral";
import {
  accountIds,
  connection,
  fetchAll,
  limit,
  serviceDeskId,
  start,
} from "./common";

const customerEmail = input({
  label: "Email",
  type: "string",
  required: true,
  comments: "The email address of the new portal-only customer.",
  placeholder: "Enter email address",
  example: "jane.smith@example.com",
  clean: util.types.toString,
});

const customerFullName = input({
  label: "Display Name",
  type: "string",
  required: true,
  comments:
    "The full name shown for the customer in the portal and on issues they raise.",
  placeholder: "Enter display name",
  example: "Jane Smith",
  clean: util.types.toString,
});

const accountId = input({
  label: "Account ID",
  type: "string",
  required: true,
  comments: "The Atlassian accountId of the customer.",
  placeholder: "Enter account ID",
  example: "5b10ac8d82e05b22cc7d4ef5",
  clean: util.types.toString,
});

export const createCustomerInputs = {
  connection,
  serviceDeskId,
  customerEmail,
  customerFullName,
};

export const createPortalOnlyCustomerInputs = {
  connection,
  customerEmail,
  customerFullName,
};

export const listCustomersInputs = {
  connection,
  serviceDeskId,
  fetchAll,
  start,
  limit,
};

export const addCustomersInputs = {
  connection,
  serviceDeskId,
  accountIds,
};

export const removeCustomersInputs = {
  connection,
  serviceDeskId,
  accountIds,
};

export const revokePortalAccessInputs = {
  connection,
  accountId,
};
