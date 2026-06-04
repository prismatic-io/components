import { input, util } from "@prismatic-io/spectral";
import { attributeJson, customerJson, entityJson, optionJson, productJson } from "./constants";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const searchCriteriaCurrentPage = input({
  label: "Current Page",
  type: "string",
  required: false,
  comments: "Current page.",
  clean: util.types.toString,
});

export const searchCriteriaConditionType = input({
  label: "Condition Type",
  type: "string",
  required: false,
  comments: "Condition type.",
  clean: util.types.toString,
});

export const searchCriteriaField = input({
  label: "Field",
  type: "string",
  required: false,
  comments: "Field.",
  clean: util.types.toString,
});

export const searchCriteriaValue = input({
  label: "Value",
  type: "string",
  required: false,
  comments: "Value.",
  clean: util.types.toString,
});

export const searchCriteriaPageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments: "Page size.",
  clean: util.types.toString,
});

export const searchCriteriaSortDirection = input({
  label: "Sorting Direction",
  type: "string",
  required: false,
  comments: "Sorting direction.",
  clean: util.types.toString,
});

export const searchCriteriaSortField = input({
  label: "Sorting Field",
  type: "string",
  required: false,
  comments: "Sorting field.",
  clean: util.types.toString,
});

export const product = input({
  label: "Product",
  type: "code",
  language: "json",
  required: true,
  comments: "Product.",
  default: JSON.stringify(productJson, null, 2),
  clean: util.types.toString,
});

export const attribute = input({
  label: "Attribute",
  type: "code",
  language: "json",
  required: true,
  comments: "Attribute.",
  default: JSON.stringify(attributeJson, null, 2),
  clean: util.types.toString,
});

export const option = input({
  label: "Option",
  type: "code",
  language: "json",
  required: true,
  comments: "Option.",
  default: JSON.stringify(optionJson, null, 2),
  clean: util.types.toString,
});

export const entity = input({
  label: "Entity",
  type: "code",
  language: "json",
  required: true,
  comments: "Entity.",
  default: JSON.stringify(entityJson, null, 2),
  clean: util.types.toString,
});

export const orderId = input({
  label: "Order ID",
  type: "string",
  required: true,
  comments: "Order ID.",
  dataSource: "selectOrder",
  clean: util.types.toString,
});

export const customer = input({
  label: "Customer",
  type: "code",
  language: "json",
  required: true,
  comments: "Customer.",
  default: JSON.stringify(customerJson, null, 2),
  clean: util.types.toString,
});

export const password = input({
  label: "Password",
  type: "string",
  required: false,
  comments: "Password.",
  clean: util.types.toString,
});

export const redirectUrl = input({
  label: "Redirect URL",
  type: "string",
  required: false,
  comments: "Redirect URL.",
  clean: util.types.toString,
});

export const customerId = input({
  label: "Customer ID",
  type: "string",
  required: true,
  comments: "Customer ID.",
  dataSource: "selectCustomer",
  clean: util.types.toString,
});

export const passwordHash = input({
  label: "Password Hash",
  type: "string",
  required: false,
  comments: "Password hash.",
  clean: util.types.toString,
});

export const transactionId = input({
  label: "Transaction ID",
  type: "string",
  required: true,
  comments: "Transaction ID.",
  dataSource: "selectTransaction",
  clean: util.types.toString,
});

export const query = input({
  label: "GraphQL Query",
  type: "code",
  required: true,
  language: "graphql",
  default: `query myCartQuery{
    cart(cart_id: String!): Cart
  }`,
  clean: util.types.toString,
});

export const store = input({
  label: "Store",
  type: "string",
  required: true,
  comments: "Input your store name for the GraphQL endpoint (https://<your store>/graphql).",
  example: "my-store",
  clean: util.types.toString,
});





const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  default: "orders",
  model: [
    { label: "Orders", value: "orders" },
    { label: "Customers", value: "customers" },
    { label: "Products", value: "products" },
  ],
  comments: "The Magento resource collection to poll for new and updated records.",
  clean: util.types.toString,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records whose `created_at` falls after the last poll will be emitted on the `created` branch.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, records whose `updated_at` falls after the last poll but were created earlier will be emitted on the `updated` branch.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection: connectionInput,
  pollResourceType,
  showNewRecords,
  showUpdatedRecords,
};
