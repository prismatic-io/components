import { input, util } from "@prismatic-io/spectral";
import { LANGUAGE_MODEL, TIMEZONE_MODEL } from "../constants";
import { cleanArrayCodeInput } from "../utils/cleanCode";
import { toInt } from "../utils/toInt";
import { toStr } from "../utils/toStr";
import { validateId } from "../utils/validateId";
import { validateLimit } from "../utils/validateLimit";
import { sharedInputs } from "./shared";

const channels = input({
  label: "Channels",
  comments:
    "The customer's contact channels. See [Gorgias API documentation](https://developers.gorgias.com/reference/create-customer) for more information.",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(
    [
      {
        preferred: false,
        type: "email",
        address: "john@example.com",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => cleanArrayCodeInput(value, "Channels"),
});

const id = input({
  label: "Customer ID",
  comments: "The ID of the customer.",
  type: "string",
  example: "3924",
  placeholder: "3924",
  required: true,
  clean: toInt,
});

const email = input({
  label: "Email",
  comments: "Primary email address of the customer.",
  type: "string",
  required: false,
  clean: toStr,
  placeholder: "john@example.com",
  example: "john@example.com",
});

const external_id = input({
  label: "External ID",
  comments:
    "ID of the customer in a foreign system (Stripe, Aircall, etc...). This field is not used by Gorgias, feel free to set it as you wish.",
  type: "string",
  required: false,
  clean: toStr,
  placeholder: "customer-84203241",
  example: "customer-84203241",
});

const language = input({
  label: "Language",
  comments: "The customer's preferred language (format: ISO_639-1).",
  type: "string",
  required: false,
  model: LANGUAGE_MODEL,
  clean: toStr,
  placeholder: "en",
  example: "en",
});

const name = input({
  label: "Name",
  comments: "Full name of the customer.",
  type: "string",
  required: false,
  clean: toStr,
  placeholder: "John Smith",
  example: "John Smith",
});

const timezone = input({
  label: "Timezone",
  comments: "The customer's preferred timezone (format: IANA timezone name).",
  type: "string",
  required: false,
  model: TIMEZONE_MODEL,
  clean: toStr,
  placeholder: "UTC",
  example: "UTC",
});

export const createCustomerInputs = {
  channels,
  email,
  external_id,
  language,
  name,
  timezone,
  ...sharedInputs,
};

export const deleteCustomerInputs = {
  id: input({ ...id, comments: "ID of the customer to delete." }),
  ...sharedInputs,
};

export const getCustomerInputs = {
  id: input({ ...id, comments: "ID of the customer you're looking for." }),
  ...sharedInputs,
};

export const listCustomersInputs = {
  id: input({
    label: "Customer ID",
    comments: "ID of the customer you're looking for.",
    type: "string",
    required: false,
    clean: validateId,
    placeholder: "3924",
  }),
  email,
  external_id,
  language,
  timezone,
  view_id: input({
    label: "View ID",
    comments: "ID of a view to filter customers by.",
    type: "string",
    required: false,
    clean: validateId,
    placeholder: "4",
  }),
  fetchAll: input({
    label: "Fetch All",
    comments:
      "When enabled, all customers will be fetched. This can be slow if you have a lot of customers. Cursor and limit will be ignored.",
    type: "boolean",
    required: false,
    default: "false",
    clean: util.types.toBool,
  }),
  cursor: input({
    label: "Cursor",
    comments:
      "Value indicating your position in the list of all customers. If omitted, the first customers of the list will be returned.",
    type: "string",
    required: false,
    clean: toStr,
    placeholder: "cHJldl9fNl9fMjAyMS0wMy0wMyAwNjowMDowMA==",
  }),
  limit: input({
    label: "Limit",
    comments:
      "Maximum number of customers to return. The max number allowed is 100.",
    type: "string",
    required: false,
    clean: validateLimit,
    placeholder: "30",
  }),
  order_by: input({
    label: "Order By",
    comments: "Attribute used to order customers.",
    type: "string",
    required: false,
    clean: toStr,
    placeholder: "created_datetime:desc",
    model: [
      {
        value: "created_datetime:asc",
        label: "Created Date (Ascending)",
      },
      {
        value: "created_datetime:desc",
        label: "Created Date (Descending)",
      },
      {
        value: "updated_datetime:asc",
        label: "Updated Date (Ascending)",
      },
      {
        value: "updated_datetime:desc",
        label: "Updated Date (Descending)",
      },
    ],
  }),
  ...sharedInputs,
};

export const selectCustomerInputs = {
  view_id: listCustomersInputs.view_id,
  connection: sharedInputs.connection,
};

export const updateCustomerInputs = {
  id: input({ ...id, comments: "ID of the customer to update." }),
  channels: input({
    ...channels,
    required: false,
    comments:
      "The customer's contact channels. See [Gorgias API documentation](https://developers.gorgias.com/reference/update-customer) for more information.",
  }),
  email,
  external_id,
  language,
  name,
  timezone,
  ...sharedInputs,
};

export const updateCustomerDataInputs = {
  id: updateCustomerInputs.id,
  data: input({
    label: "Data",
    comments: "The customer data.",
    type: "string",
    required: true,
    example: "Your customer data here",
    placeholder: "Your customer data here",
    clean: toStr,
  }),
  version: input({
    label: "Version",
    comments:
      "The date of the customer data. If we already have a more recent version, the request will be ignored.",
    type: "string",
    required: false,
    clean: toStr,
    placeholder: "2022-05-13T12:34:21.918927",
    example: "2022-05-13T12:34:21.918927",
  }),
  ...sharedInputs,
};
