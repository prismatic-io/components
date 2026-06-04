import { input, type KeyValuePair, util } from "@prismatic-io/spectral";

export const resourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of QuickBooks resource to operate on.",
  model: [
    { label: "Account", value: "account" },
    { label: "Bill", value: "bill" },
    { label: "Customer", value: "customer" },
    { label: "Employee", value: "employee" },
    { label: "Estimate", value: "estimate" },
    { label: "Invoice", value: "invoice" },
    { label: "Item", value: "item" },
    { label: "Payment", value: "payment" },
    { label: "Purchase", value: "purchase" },
    { label: "Purchase Order", value: "purchaseorder" },
    { label: "Vendor", value: "vendor" },
  ],
  clean: util.types.toString,
});

export const resourceData = input({
  label: "Resource Data",
  type: "data",
  required: false,
  comments: "A full map of the resource data to create or update.",
});

export const resourceAttributes = input({
  label: "Resource Attributes",
  type: "data",
  collection: "keyvaluelist",
  required: false,
  comments:
    "A list of attributes used to create a resource in QuickBooks. For more information refer to https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/customer.",
  clean: (value: unknown) => {
    return Object.fromEntries(
      (value as KeyValuePair[]).map((param) => {
        const valueString = util.types.toString(param.value);
        if (valueString.startsWith("{")) {
          return [param.key, util.types.toObject(param.value)];
        } else if (!util.types.isNumber(valueString)) {
          return [param.key, param.value];
        } else {
          return [param.key, util.types.toNumber(param.value)];
        }
      }),
    );
  },
});

export const syncToken = input({
  label: "Sync Token",
  placeholder: "Enter sync token",
  type: "string",
  required: true,
  comments:
    "The sync token of the resource, used for optimistic locking to prevent concurrent update conflicts.",
  clean: util.types.toString,
});

export const resourceId = input({
  label: "Resource ID",
  placeholder: "Enter resource ID",
  type: "string",
  required: true,
  comments: "The primary ID of a resource in QuickBooks.",
  clean: util.types.toString,
});
