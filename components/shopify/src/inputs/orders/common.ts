import { input, util } from "@prismatic-io/spectral";
import { cleanCodeInput, cleanStringInput } from "../../util";

export const orderData = input({
  label: "Order Data",
  type: "code",
  language: "json",
  comments: "JSON data to be sent as the Order payload.",
  required: true,
  placeholder: "Enter order data JSON",
  example: JSON.stringify(
    {
      line_items: [
        {
          variant_id: "variant-id",
          quantity: 2,
        },
      ],
      customer: {
        id: "customer-id",
      },
      financial_status: "status",
    },
    null,
    2,
  ),
  clean: cleanCodeInput,
});

export const status = input({
  label: "Status",
  type: "string",
  required: true,
  comments: "Filter orders by their status.",
  model: [
    { label: "Any", value: "any" },
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
  ],
  clean: util.types.toString,
});

export const attributionAppId = input({
  label: "Attribution App ID",
  type: "string",
  required: false,
  comments: "Show orders attributed to a certain app, specified by the app ID.",
  example: "current",
  placeholder: "Enter app ID",
  clean: cleanStringInput,
});

export const createdAtMax = input({
  label: "Created At Max",
  type: "string",
  required: false,
  comments:
    "Show orders created at or before date. ISO 8601 format like 2021-10-01 or 2021-10-01T00:00:00-04:00 for exact time.",
  example: "2021-10-01",
  placeholder: "Enter date (YYYY-MM-DD)",
  clean: cleanStringInput,
});

export const created_at_min = input({
  label: "Created At Min",
  type: "string",
  required: false,
  comments:
    "Show orders created at or after this date. Use ISO 8601 format (YYYY-MM-DD or YYYY-MM-DDTHH:mm:ss-HH:mm).",
  example: "2021-10-01",
  placeholder: "Enter date (YYYY-MM-DD)",
  clean: util.types.toString,
});

export const fields = input({
  label: "Fields",
  type: "string",
  required: false,
  comments: "Retrieve only certain fields, specified by a comma-separated list of fields names.",
  example: "id,currency",
  placeholder: "Enter field names",
  clean: cleanStringInput,
});

export const financialStatus = input({
  label: "Financial Status",
  type: "string",
  required: false,
  comments: "Filter orders by their financial status.",
  example: "authorized",
  placeholder: "Select financial status",
  model: [
    { label: "Authorized", value: "authorized" },
    { label: "Paid", value: "paid" },
    { label: "Partially Paid", value: "partially_paid" },
    { label: "Partially Refunded", value: "partially_refunded" },
    { label: "Pending", value: "pending" },
    { label: "Refunded", value: "refunded" },
    { label: "Voided", value: "voided" },
    { label: "Unpaid", value: "unpaid" },
    { label: "Any", value: "any" },
  ],
  clean: cleanStringInput,
});

export const fulfillmentStatus = input({
  label: "Fulfillment Status",
  type: "string",
  required: false,
  comments: "Filter orders by their fulfillment status.",
  example: "shipped",
  placeholder: "Select fulfillment status",
  model: [
    { label: "Shipped", value: "shipped" },
    { label: "Partial", value: "partial" },
    { label: "Unshipped", value: "unshipped" },
    { label: "Any", value: "any" },
    { label: "Unfulfilled", value: "unfulfilled" },
  ],
  clean: cleanStringInput,
});

export const commaSeparatedIds = input({
  label: "IDs",
  type: "string",
  required: false,
  comments: "Retrieve only orders specified by a comma-separated list of order IDs.",
  example: "450789469,39072856",
  placeholder: "Enter comma-separated IDs",
  clean: cleanStringInput,
});

export const processedAtMax = input({
  label: "Processed At Max",
  type: "string",
  required: false,
  comments:
    "Show orders imported at or before date. ISO 8601 format like 2021-10-01 or 2021-10-01T00:00:00-04:00 for exact time.",
  example: "2021-10-01",
  placeholder: "Enter date (YYYY-MM-DD)",
  clean: cleanStringInput,
});

export const processedAtMin = input({
  label: "Processed At Min",
  type: "string",
  required: false,
  comments:
    "Show orders imported at or after date. ISO 8601 format like 2021-10-01 or 2021-10-01T00:00:00-04:00 for exact time.",
  example: "2021-10-01",
  placeholder: "Enter date (YYYY-MM-DD)",
  clean: cleanStringInput,
});

export const sinceId = input({
  label: "Since ID",
  type: "string",
  required: false,
  comments: "Show orders after the specified ID.",
  example: "450789469",
  placeholder: "Enter order ID",
  clean: cleanStringInput,
});

export const orderStatus = input({
  label: "Status",
  type: "string",
  required: false,
  comments: "Filter orders by their status.",
  example: "open",
  placeholder: "Select status",
  model: [
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
    { label: "Any", value: "any" },
    { label: "Cancelled", value: "cancelled" },
  ],
  clean: cleanStringInput,
});

export const updatedAtMax = input({
  label: "Updated At Max",
  type: "string",
  required: false,
  comments:
    "Show orders last updated at or before date. ISO 8601 format like 2021-10-01 or 2021-10-01T00:00:00-04:00 for exact time.",
  example: "2021-10-01",
  placeholder: "Enter date (YYYY-MM-DD)",
  clean: cleanStringInput,
});
