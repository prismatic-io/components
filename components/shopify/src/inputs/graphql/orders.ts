import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInputEmptyObject, cleanStringInput } from "../../util";
import {
  getAlldata,
  orderId,
  pagination,
  query,
  shopifyConnection,
} from "./common";
const notifyCustomer = input({
  label: "Notify Customer",
  type: "boolean",
  required: false,
  default: "false",
  comments: "Whether the customer should be notified of the cancellation.",
  clean: util.types.toBool,
});
const reason = input({
  label: "Reason",
  type: "string",
  required: true,
  example: "CUSTOMER",
  placeholder: "Select reason",
  comments: "The reason for the cancellation.",
  model: [
    {
      label: "Customer",
      value: "CUSTOMER",
    },
    {
      label: "Declined",
      value: "DECLINED",
    },
    {
      label: "Fraud",
      value: "FRAUD",
    },
    {
      label: "Inventory",
      value: "INVENTORY",
    },
    {
      label: "Other",
      value: "OTHER",
    },
    {
      label: "Staff",
      value: "STAFF",
    },
  ],
  clean: util.types.toString,
});
const refund = input({
  label: "Refund",
  type: "boolean",
  required: true,
  comments: "Whether to refund the amount paid by the customer.",
  clean: util.types.toBool,
});
const restock = input({
  label: "Restock",
  type: "boolean",
  required: true,
  comments: "Whether to restock the inventory committed to the order.",
  clean: util.types.toBool,
});
const staffNote = input({
  label: "Staff Note",
  type: "string",
  required: false,
  comments:
    "A staff-facing note about the order cancellation. This is not visible to the customer.",
  example: "This is a staff note.",
  placeholder: "Enter staff note",
  clean: cleanStringInput,
});
const orderData = input({
  label: "Order Data",
  type: "code",
  language: "json",
  comments: "JSON data to be sent as the Order payload.",
  required: true,
  example: JSON.stringify(
    {
      currency: "EUR",
      lineItems: [
        {
          title: "Big Brown Bear Boots",
          priceSet: {
            shopMoney: {
              amount: 74.99,
              currencyCode: "EUR",
            },
          },
          quantity: 3,
          taxLines: [
            {
              priceSet: {
                shopMoney: {
                  amount: 10.2,
                  currencyCode: "EUR",
                },
              },
              rate: 0.06,
              title: "State tax",
            },
          ],
        },
      ],
      transactions: [
        {
          kind: "SALE",
          status: "SUCCESS",
          amountSet: {
            shopMoney: {
              amount: 238.47,
              currencyCode: "EUR",
            },
          },
        },
      ],
    },
    null,
    2,
  ),
  clean: (value) => cleanCodeInputEmptyObject(value, "Order Data"),
});
export const cancelOrderInputs = {
  shopifyConnection,
  orderId,
  reason,
  refund,
  restock,
  notifyCustomer,
  staffNote,
};
export const listOrdersInputs = {
  shopifyConnection,
  getAlldata,
  query: input({
    ...query,
    comments: "The query to filter the orders.",
    placeholder: "updated_at:>2019-12-01",
    example: "updated_at:>2019-12-01",
  }),
  pagination,
};
export const closeOrderInputs = {
  shopifyConnection,
  orderId,
};
export const countOrdersInputs = {
  shopifyConnection,
};
export const createOrderInputs = {
  shopifyConnection,
  orderData,
};
export const getOrderInputs = {
  shopifyConnection,
  orderId,
};
export const deleteOrderInputs = {
  shopifyConnection,
  orderId,
};
