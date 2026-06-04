import { input, util } from "@prismatic-io/spectral";

import {
  cleanBooleanInput,
  cleanCodeInput,
  cleanKeyValueListInput,
  cleanNumberInput,
  cleanNumberValueListInput,
  cleanStringInput,
  cleanStringValueListInput,
  mapBooleanModelInput,
  mapModelValues,
  mapStatusModelInput,
} from "./util";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const urlType = input({
  label: "URL Type",
  type: "string",
  example: "jpm",
  required: true,
  comments:
    "The URL type to connect to. For example, jpm, crm, accounting, etc.",
  placeholder: "jpm",
  clean: cleanStringInput,
});

export const paymentId = input({
  label: "Payment ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the payment.",
  placeholder: "10978752986",
  clean: cleanStringInput,
  dataSource: "selectPayment",
});

export const invoiceId = input({
  label: "Invoice ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the invoice.",
  placeholder: "10978752986",
  clean: cleanStringInput,
  dataSource: "selectInvoice",
});

export const itemId = input({
  label: "Item ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the item.",
  placeholder: "10978752986",
  clean: cleanStringInput,
});

export const bookingProvider = input({
  label: "Booking Provider",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the booking provider.",
  placeholder: "10978752986",
  clean: cleanStringInput,
});

export const bookingId = input({
  label: "Booking ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the booking.",
  placeholder: "10978752986",
  clean: cleanStringInput,
  dataSource: "selectBooking",
});

export const appointmentId = input({
  label: "Appointment ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the appointment.",
  placeholder: "10978752986",
  clean: cleanStringInput,
  dataSource: "selectAppointment",
});

export const tenant = input({
  label: "Tenant",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The client tenant.",
  placeholder: "10978752986",
  clean: cleanStringInput,
});

export const applicationKey = input({
  label: "Application Key",
  type: "string",
  example: "ak1.4adsy4lzgsd0b3cqh48zl5z3d7",
  required: true,
  comments: "The ID of the payment.",
  placeholder: "ak1.4adsy4lzgsd0b3cqh48zl5z3d7",
  clean: cleanStringInput,
});

export const environment = input({
  key: "environment",
  label: "Environment",
  type: "string",
  required: true,
  comments: "The environment to connect to",
  model: [
    {
      value: "production",
      label: "Production environment",
    },
    {
      value: "integration",
      label: "Integration environment",
    },
  ],
  clean: cleanStringInput,
});

export const typeId = input({
  label: "Type ID",
  type: "string",
  example: "0",
  required: true,
  comments: "The ID of the type of the payment.",
  placeholder: "0",
  clean: cleanNumberInput,
});

export const locationId = input({
  label: "Location ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the location.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectLocation",
});

export const projectId = input({
  label: "Project ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "ID of the job's project",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectProject",
});

export const memo = input({
  label: "Memo",
  type: "string",
  example: "Payment for services rendered.",
  required: false,
  comments: "The memo of the payment.",
  placeholder: "Payment for services rendered.",
  clean: cleanStringInput,
});

export const active = input({
  label: "Active",
  type: "string",
  required: false,
  comments: "The active status of the payment.",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});

export const paidOn = input({
  label: "Paid On",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The date the payment was paid on.",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const authCode = input({
  label: "Auth Code",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
  required: false,
  comments: "The authorization code for the payment.",
  placeholder: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
  clean: cleanStringInput,
});

export const checkNumber = input({
  label: "Check Number",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
  required: false,
  comments: "The check number for the payment.",
  placeholder: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
  clean: cleanStringInput,
});

export const exportId = input({
  label: "Export ID",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
  required: false,
  comments: "Gets or sets the identifier when exported.",
  placeholder: "6B29FC40-CA47-1067-B31D-00DD010662DA21323",
  clean: cleanStringInput,
});

export const status = input({
  label: "Status",
  type: "string",
  required: false,
  model: mapStatusModelInput,
  default: "",
  comments: "The status of the payment.",
  clean: cleanStringInput,
});

export const splits = input({
  label: "Splits",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    [
      {
        invoiceId: 0,
        amount: 0,
      },
    ],
    null,
    2,
  ),
  comments: "The splits of the payment.",
  clean: cleanCodeInput,
});

export const ids = input({
  label: "IDs",
  type: "string",
  collection: "valuelist",
  example: "10978752986",
  required: false,
  comments: "Perform lookup by multiple IDs (maximum 50)",
  placeholder: "10978752986",
  clean: cleanStringInput,
});

export const statuses = input({
  label: "Statuses",
  type: "string",
  collection: "valuelist",
  example: "Pending,Posted,Exported",
  required: false,
  comments: "Statuses to filter by",
  model: mapStatusModelInput,
  clean: cleanStringInput,
});

export const paidOnAfter = input({
  label: "Paid On After",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The date the payment was paid on after.",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const paidOnBefore = input({
  label: "Paid On Before",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The date the payment was paid on Before.",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const businessUnitIds = input({
  label: "Business Unit IDs",
  type: "string",
  collection: "valuelist",
  example: "10978752986",
  required: false,
  comments: "Business unit IDs to filter by",
  placeholder: "10978752986",
  clean: cleanStringInput,
  dataSource: "selectBusinessUnit",
});

export const batchNumber = input({
  label: "Batch Number",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The batch number to filter by",
  placeholder: "10978752986",
  clean: cleanNumberInput,
});

export const batchId = input({
  label: "Batch ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The batch Id to filter by",
  placeholder: "10978752986",
  clean: cleanNumberInput,
});

export const transactionType = input({
  label: "Transaction Type",
  type: "string",
  required: false,
  comments: "The transaction type to filter by",
  model: mapModelValues(["Undefined", "JournalEntry", "ReceivePayment"], true),
  default: "",
  clean: cleanStringInput,
});

export const customerId = input({
  label: "Customer ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The customer ID.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectCustomers",
});

export const customerContactId = input({
  label: "Customer Contact ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The customer contact ID.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectCustomerContact",
});

export const jobId = input({
  label: "Job ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The job ID.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectJob",
});

export const totalGreater = input({
  label: "Total Greater",
  type: "string",
  example: "100",
  required: false,
  comments: "The total greater than to filter by",
  placeholder: "100",
  clean: cleanNumberInput,
});

export const totalLess = input({
  label: "Total Less",
  type: "string",
  example: "100",
  required: false,
  comments: "The total less than to filter by",
  placeholder: "100",
  clean: cleanNumberInput,
});

export const page = input({
  label: "Page",
  type: "string",
  example: "1",
  required: false,
  comments: "The page number to filter by",
  placeholder: "1",
  clean: cleanNumberInput,
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  example: "50",
  required: false,
  comments: "How many records to return (50 by default)",
  placeholder: "50",
  clean: cleanNumberInput,
});

export const includeTotal = input({
  label: "Include Total",
  type: "boolean",
  required: false,
  comments:
    "Include total count of records. If fetchAll is true, this will be ignored.",
  clean: util.types.toBool,
});

export const modifiedBefore = input({
  label: "Modified Before",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Return items modified before certain date/time (in UTC)",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const modifiedOnOrAfter = input({
  label: "Modified On Or After",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Return items modified on or after certain date/time (in UTC)",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const createdBefore = input({
  label: "Created Before",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Return items created before certain date/time (in UTC)",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const createdOnOrAfter = input({
  label: "Created On Or After",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Return items created on or after certain date/time (in UTC)",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const sort = input({
  label: "Sort",
  type: "string",
  example: "+FieldName",
  required: false,
  comments:
    "Applies sorting by the specified field:'?sort=+FieldName' for ascending order,'?sort=-FieldName' for descending order.",
  placeholder: "+FieldName",
  clean: cleanStringInput,
});

export const operations = input({
  label: "Operations",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    [
      {
        objectId: 0,
        customFields: [
          {
            name: "string",
            value: "string",
          },
        ],
      },
    ],
    null,
    2,
  ),
  comments: "The operations to perform on the payment.",
  clean: cleanCodeInput,
});

export const customQueryParams = input({
  label: "Custom Query Params",
  type: "string",
  collection: "keyvaluelist",
  example: "key1=value1",
  required: false,
  comments: "Custom fields filter",
  placeholder: "key1=value1",
  clean: cleanKeyValueListInput,
});

export const number = input({
  label: "Number",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The invoice number.",
  placeholder: "10978752986",
  clean: cleanStringInput,
});

export const invoicedOn = input({
  label: "Invoiced On",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The date the invoice was invoiced on.",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const subtotal = input({
  label: "Subtotal",
  type: "string",
  example: "100.00",
  required: false,
  comments: "The subtotal of the invoice.",
  placeholder: "100.00",
  clean: cleanNumberInput,
});

export const tax = input({
  label: "Tax",
  type: "string",
  example: "100.00",
  required: false,
  comments: "The tax of the invoice.",
  placeholder: "100.00",
  clean: cleanNumberInput,
});

export const summary = input({
  label: "Summary",
  type: "string",
  example: "A summary related to the invoice.",
  required: false,
  comments: "The summary of the invoice.",
  placeholder: "A summary related to the invoice.",
  clean: cleanStringInput,
});

export const royaltyStatus = input({
  label: "Royalty Status",
  type: "string",
  required: false,
  comments: "The royalty status of the invoice.",
  model: mapModelValues(["Pending", "Sent", "Failed"], true),
  clean: cleanStringInput,
});

export const reviewStatus = input({
  label: "Review Status",
  type: "string",
  required: false,
  comments: "The review status of the invoice.",
  model: mapModelValues(["NeedsReview", "OnHold", "Reviewed"], true),
  clean: cleanStringInput,
});

export const items = input({
  label: "Items",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    [
      {
        skuId: 0,
        skuName: "string",
        technicianId: 0,
        description: "string",
        quantity: 0,
        unitPrice: 0,
        cost: 0,
        isAddOn: true,
        signature: "string",
        technicianAcknowledgementSignature: "string",
        installedOn: "string",
        inventoryWarehouseName: "string",
        skipUpdatingMembershipPrices: true,
        itemGroupName: "string",
        itemGroupRootId: 0,
        inventoryLocationId: 0,
        durationBillingId: 0,
        id: 0,
      },
    ],
    null,
    2,
  ),
  comments: "The items of the invoice.",
  clean: cleanCodeInput,
});

export const royaltyDate = input({
  label: "Royalty Date",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The royalty date of the invoice.",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const royaltySentOn = input({
  label: "Royalty Sent On",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The royalty sent date of the invoice.",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const royaltyMemo = input({
  label: "Royalty Memo",
  type: "string",
  example: "Payment for services rendered.",
  required: false,
  comments: "The royalty sent date of the invoice.",
  placeholder: "Payment for services rendered.",
  clean: cleanStringInput,
});

export const assignedToId = input({
  label: "Assigned To ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The ID of the user the invoice is assigned to.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
});

export const adjustmentToId = input({
  label: "Adjustment To ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "The ID of the invoice the adjustment is for.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectInvoice",
});

export const payments = input({
  label: "Payments",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    [
      {
        id: 0,
        settlementStatus: {},
        settlementDate: "string",
      },
    ],
    null,
    2,
  ),
  comments: "The payments of the invoice.",
  clean: cleanCodeInput,
});

export const skuId = input({
  label: "SKU ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The ID of the SKU.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
});

export const technicianId = input({
  label: "Technician ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The ID of the technician.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
  dataSource: "selectTechnician",
});

export const skuName = input({
  label: "SKU Name",
  type: "string",
  example: "Test SKU",
  required: false,
  comments: "The name of the SKU.",
  placeholder: "Test SKU",
  clean: cleanStringInput,
});

export const description = input({
  label: "Description",
  type: "string",
  example: "A test SKU",
  required: true,
  comments: "The description of the SKU.",
  placeholder: "A test SKU",
  clean: cleanStringInput,
});

export const quantity = input({
  label: "Quantity",
  type: "string",
  example: "2",
  required: true,
  comments: "The quantity of the SKU.",
  placeholder: "2",
  clean: cleanNumberInput,
});

export const unitPrice = input({
  label: "Unit Price",
  type: "string",
  example: "2.0",
  required: false,
  comments: "The unit price of the SKU.",
  placeholder: "2.0",
  clean: cleanNumberInput,
});

export const cost = input({
  label: "Cost",
  type: "string",
  example: "2.0",
  required: false,
  comments: "The cost of the SKU.",
  placeholder: "2.0",
  clean: cleanNumberInput,
});

export const isAddOn = input({
  label: "Is Add On",
  type: "string",
  required: false,
  comments: "Is the SKU an add on.",
  model: mapBooleanModelInput,
  default: "",
  clean: cleanBooleanInput,
});

export const signature = input({
  label: "Signature",
  type: "string",
  example: "An example signature.",
  required: false,
  comments: "The signature of the SKU.",
  placeholder: "An example signature.",
  clean: cleanStringInput,
});

export const technicianAcknowledgementSignature = input({
  label: "Technician Acknowledgement Signature",
  type: "string",
  example: "Test Signature",
  required: false,
  comments: "The technician acknowledgement signature of the SKU.",
  placeholder: "Test Signature",
  clean: cleanStringInput,
});

export const installedOn = input({
  label: "Installed On",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "The date the SKU was installed on.",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const inventoryWarehouseName = input({
  label: "Inventory Warehouse Name",
  type: "string",
  example: "Warehouse",
  required: false,
  comments: "The inventory warehouse name of the SKU.",
  placeholder: "Warehouse",
  clean: cleanStringInput,
});

export const skipUpdatingMembershipPrices = input({
  label: "Skip Updating Membership Prices",
  type: "string",
  required: false,
  comments: "Skip updating membership prices.",
  model: mapBooleanModelInput,
  default: "",
  clean: cleanBooleanInput,
});

export const itemGroupName = input({
  label: "Item Group Name",
  type: "string",
  example: "Test Group",
  required: false,
  comments: "The item group name of the SKU.",
  placeholder: "Test Group",
  clean: cleanStringInput,
});

export const itemGroupRootId = input({
  label: "Item Group Root ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The item group root ID of the SKU.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
});

export const inventoryLocationId = input({
  label: "Inventory Location ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The inventory location ID of the SKU.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
});

export const durationBillingId = input({
  label: "Duration Billing ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The duration billing ID of the SKU.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
});

export const id = input({
  label: "ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "The ID.",
  placeholder: "10978752986",
  clean: cleanNumberInput,
});

export const source = input({
  label: "Source",
  type: "string",
  example: "Test Source",
  required: true,
  comments: "The source of the booking provider",
  placeholder: "Test Source",
  clean: cleanStringInput,
});

export const name = input({
  label: "Name",
  type: "string",
  example: "Test Source",
  required: true,
  comments: "Name of the customer",
  placeholder: "Test Source",
  clean: cleanStringInput,
});

export const address = input({
  label: "Address",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    {
      street: "string",
      unit: "string",
      city: "string",
      state: "string",
      zip: "string",
      country: "string",
    },
    null,
    2,
  ),
  comments: "Address of the booking",
  clean: cleanCodeInput,
});

export const contacts = input({
  label: "Contacts",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    [
      {
        type: "Phone",
        value: "string",
        memo: "string",
      },
    ],
    null,
    2,
  ),
  comments: "Contacts for the booking",
  clean: cleanCodeInput,
});

export const customerType = input({
  label: "Customer Type",
  type: "string",
  required: false,
  comments: "Type of the customer",
  model: mapModelValues(["Residential", "Commercial"], true),
  clean: cleanStringInput,
});

export const start = input({
  label: "Start",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Start date/time (in UTC)",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const end = input({
  label: "End",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "End date/time (in UTC)",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const arrivalWindowStart = input({
  label: "Arrival Window Start",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Arrival window start date/time (in UTC) ",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const arrivalWindowEnd = input({
  label: "Arrival Window End",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Arrival window end date/time (in UTC) ",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const campaignId = input({
  label: "Campaign ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "ID of the booking's campaign",
  placeholder: "10978752986",
  clean: cleanStringInput,
});

export const businessUnitId = input({
  label: "Business Unit ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "ID of the booking's business unit",
  placeholder: "10978752986",
  clean: cleanStringInput,
  dataSource: "selectBusinessUnit",
});

export const jobTypeId = input({
  label: "Job Type ID",
  type: "string",
  example: "10978752986",
  required: false,
  comments: "ID of the booking's job type",
  placeholder: "10978752986",
  clean: cleanStringInput,
});

export const priority = input({
  label: "Priority",
  type: "string",
  required: false,
  comments: "Booking priority",
  model: mapModelValues(["Low", "Normal", "High", "Urgent"], true),
  clean: cleanStringInput,
});

export const externalId = input({
  label: "External ID",
  type: "string",
  example: "10978752986",
  required: true,
  comments: "External ID of booking",
  placeholder: "10978752986",
  clean: cleanStringInput,
});

export const isFirstTimeClient = input({
  label: "Is First Time Client",
  type: "string",
  required: true,
  comments: "True if first time client",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});

export const uploadedImages = input({
  label: "Uploaded Images",
  type: "string",
  collection: "valuelist",
  required: false,
  comments: "Uploaded images",
  clean: cleanStringValueListInput,
});

export const isSendConfirmationEmail = input({
  label: "Send Confirmation Email",
  type: "string",
  required: false,
  comments: "True if first time client",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});

export const doNotMail = input({
  label: "Do Not Mail",
  type: "string",
  required: false,
  comments: "Customer has been flagged as “do not mail”",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});

export const doNotService = input({
  label: "Do Not Service",
  type: "string",
  required: false,
  comments: "Customer has been flagged as “do not service”",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});

export const location = input({
  label: "Location",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    [
      {
        name: "string",
        address: {
          street: "string",
          unit: "string",
          city: "string",
          state: "string",
          zip: "string",
          country: "string",
          latitude: 0,
          longitude: 0,
        },
        contacts: [
          {
            type: {},
            value: "string",
            memo: "string",
          },
        ],
        customFields: [
          {
            typeId: 0,
            value: "string",
          },
        ],
        tagTypeIds: [0],
        externalData: {
          applicationGuid: "string",
          externalData: [
            {
              key: "string",
              value: "string",
            },
          ],
        },
      },
    ],
    null,
    2,
  ),
  comments: "Locations for the customer",
  clean: cleanCodeInput,
});

export const customFields = input({
  label: "Custom Fields",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    [
      {
        typeId: 0,
        value: "string",
      },
    ],
    null,
    2,
  ),
  comments: "Custom fields for the request",
  clean: cleanCodeInput,
});

export const tagTypeIds = input({
  label: "Tag Type IDs",
  type: "string",
  collection: "valuelist",
  example: "123",
  required: false,
  comments: "A list of tags ID's",
  placeholder: "123",
  clean: cleanNumberValueListInput,
});

export const externalData = input({
  label: "External Data",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    {
      applicationGuid: "string",
      externalData: [
        {
          key: "string",
          value: "string",
        },
      ],
    },
    null,
    2,
  ),
  comments: "External data to attach to the request.",
  clean: cleanCodeInput,
});

export const customerContactType = input({
  label: "Customer Contact Type",
  type: "string",
  required: true,
  comments: "Type of the customer contact",
  model: mapModelValues(["Phone", "Email", "Fax", "MobilePhone"], true),
  default: "",
  clean: cleanStringInput,
});

export const customerContactTypeValue = input({
  label: "Customer Contact Type Value",
  type: "string",
  example: "1234567890",
  required: true,
  comments: "The email, phone number, or fax number for the contact",
  placeholder: "1234567890",
  clean: cleanStringInput,
});

export const externalDataApplicationGuid = input({
  label: "External Data Application Guid",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA",
  required: true,
  comments:
    "Format - guid. If this guid is provided, external data corresponding to this application guid will be returned.",
  placeholder: "6B29FC40-CA47-1067-B31D-00DD010662DA",
  clean: cleanStringInput,
});

export const jobGeneratedLeadSource = input({
  label: "Job Generated Lead Source",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    {
      jobId: 0,
      employeeId: 0,
    },
    null,
    2,
  ),
  comments:
    "Object that contains: JobId: ID of the job from which this job was generated EmployeeId: ID of the office user or technician",
  clean: cleanCodeInput,
});

export const appointments = input({
  label: "Appointments",
  type: "code",
  language: "json",
  required: true,
  default: JSON.stringify(
    [
      {
        start: "string",
        end: "string",
        arrivalWindowStart: "string",
        arrivalWindowEnd: "string",
        technicianIds: [0],
      },
    ],
    null,
    2,
  ),
  comments: "List of appointment information",
  clean: cleanCodeInput,
});

export const invoiceSignatureIsRequired = input({
  label: "Invoice Signature Is Required",
  type: "string",
  required: false,
  comments:
    "Optional model that informs if invoice should requires a signature or not if not informed will follow the rules for location and job type",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});

export const customerPo = input({
  label: "Customer PO",
  type: "string",
  required: false,
  comments: "Customer PO",
  clean: cleanStringInput,
  default: "",
});

export const shouldUpdateInvoiceItems = input({
  label: "Should Update Invoice Items",
  type: "string",
  required: false,
  comments:
    "If set to true, update the business unit of invoice items on job's invoice",
  model: mapBooleanModelInput,
  clean: cleanBooleanInput,
  default: "",
});

export const reasonId = input({
  label: "Reason ID",
  type: "string",
  required: true,
  comments: "ID of job cancel reason",
  example: "1088",
  placeholder: "1088",
  clean: cleanStringInput,
  dataSource: "selectJobCancelReason",
});

export const jobMemo = input({
  label: "Job Memo",
  type: "text",
  required: true,
  comments: "Memo of job cancel reason",
  example: "string",
  placeholder: "string",
  clean: cleanStringInput,
});

export const technicianIds = input({
  label: "Technician IDs",
  type: "string",
  collection: "valuelist",
  example: "1088",
  required: false,
  comments: "List of IDs of technicians to assign to new appointment",
  placeholder: "1088",
  clean: cleanNumberValueListInput,
  dataSource: "selectTechnician",
});

export const specialInstructions = input({
  label: "Special Instructions",
  type: "text",
  required: false,
  comments: "Special instructions associated to the appointment",
  example: "Any special instructions",
  placeholder: "Any special instructions",
  clean: cleanStringInput,
});

export const projectManagerIds = input({
  label: "Project Manager IDs",
  type: "string",
  collection: "valuelist",
  example: "1088",
  required: false,
  comments: "IDs of the project's managers",
  placeholder: "1088",
  clean: cleanNumberValueListInput,
});

export const statusId = input({
  label: "Status ID",
  type: "string",
  required: false,
  comments: "Project status id",
  example: "1088",
  placeholder: "1088",
  clean: cleanStringInput,
});

export const subStatusId = input({
  label: "Sub Status ID",
  type: "string",
  required: false,
  comments: "Project sub status id",
  example: "1088",
  placeholder: "1088",
  clean: cleanStringInput,
});

export const targetCompletionDate = input({
  label: "Target Completion Date",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Target completion date of the project",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const actualCompletionDate = input({
  label: "Actual Completion Date",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Actual completion date of the project",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const jobsIds = input({
  label: "Jobs IDs",
  type: "string",
  collection: "valuelist",
  example: "1088",
  required: false,
  comments: "IDs of the project's jobs",
  placeholder: "1088",
  clean: cleanNumberValueListInput,
  dataSource: "selectJob",
});

export const taxZoneId = input({
  label: "Tax Zone ID",
  type: "string",
  example: "1088",
  required: false,
  comments: "ID of the location tax zone",
  placeholder: "1088",
  clean: cleanNumberInput,
});

export const phoneNumber = input({
  label: "Phone Number",
  type: "string",
  example: "1234567890",
  required: false,
  comments: "Technician's phone number",
  placeholder: "1234567890",
  clean: cleanStringInput,
});

export const email = input({
  label: "Email",
  type: "string",
  example: "test@technician.us",
  required: false,
  comments: "Technician's email address",
  placeholder: "test@technician.us",
  clean: cleanStringInput,
});

export const login = input({
  label: "Login Username",
  type: "string",
  example: "technician_us",
  required: false,
  comments: "Technician's username",
  placeholder: "technician_us",
  clean: cleanStringInput,
});

export const password = input({
  label: "Password",
  type: "string",
  example: "@an1pwd123",
  required: false,
  comments: "Technician's password",
  placeholder: "@an1pwd123",
  clean: cleanStringInput,
});

export const accountCreationMethod = input({
  label: "Account Creation Method",
  type: "string",
  required: true,
  comments: "Account creation method",
  model: mapModelValues(
    ["CreateLater", "SendInvite", "AssignLoginAndPassword"],
    true,
  ),
  clean: cleanStringInput,
  default: "",
});

export const roleId = input({
  label: "Role ID",
  type: "string",
  example: "7",
  required: true,
  comments: "User role Id",
  placeholder: "7",
  clean: cleanNumberInput,
  dataSource: "selectUserRole",
});

export const positions = input({
  label: "Positions",
  type: "string",
  required: true,
  collection: "valuelist",
  comments: "List of company positions",
  model: mapModelValues(
    [
      "Installer",
      "Service",
      "Sales",
      "Maintenance",
      "Helper",
      "InstallProductionManager",
      "ServiceManager",
      "SalesManager",
      "PartRunner",
      "DummyTech",
    ],
    true,
  ),
  clean: cleanStringValueListInput,
});

export const aadUserId = input({
  label: "Azure Active Directory User Id",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA",
  required: false,
  comments: "Azure Active Directory User Id",
  placeholder: "6B29FC40-CA47-1067-B31D-00DD010662DA",
  clean: cleanStringInput,
});

export const licenseType = input({
  label: "License Type",
  type: "string",
  required: true,
  comments: "License type",
  model: mapModelValues(
    ["NonManagedTech", "ManagedTech", "ManagedInstaller"],
    true,
  ),
  clean: cleanStringInput,
  default: "",
});

export const team = input({
  label: "Team",
  type: "string",
  example: "Test Team",
  required: false,
  comments: "Team name",
  placeholder: "Test Team",
  clean: cleanStringInput,
});

export const dailyGoal = input({
  label: "Daily Goal",
  type: "string",
  example: "5.6",
  required: false,
  comments: "Daily revenue goal",
  placeholder: "5.6",
  clean: cleanNumberInput,
});

export const burdenRate = input({
  label: "Burden Rate",
  type: "string",
  example: "5.6",
  required: false,
  comments: "Burden rate (hourly)",
  placeholder: "5.6",
  clean: cleanNumberInput,
});

export const bio = input({
  label: "Biography",
  type: "string",
  example: "Biography",
  required: false,
  comments: "Biography of the technician",
  placeholder: "Biography",
  clean: cleanStringInput,
});

export const jobFilter = input({
  label: "Job Filter",
  type: "string",
  required: false,
  comments: "Upcoming appointment visibility",
  model: mapModelValues(
    [
      "AllScheduledDispatchedWorking",
      "NextScheduledDispatchedWorking",
      "DispatchedWorking",
      "NextScheduledDispatchedWorkingToday",
      "AllScheduledDispatchedWorkingToday",
      "AllScheduledDispatchedWorkingFiveDays",
      "NextScheduledDispatchedWorkingTodayTomorrow",
      "AllScheduledDispatchedWorkingTodayTomorrow",
      "Next2ScheduledDispatchedWorkingToday",
    ],
    true,
  ),
  clean: cleanStringInput,
  default: "",
});

export const jobHistoryDateFilter = input({
  label: "Job History Date Filter",
  type: "string",
  required: false,
  comments: "Appointment history visibility",
  model: mapModelValues(
    ["AllJobs", "LastThreeDays", "LastSevenDays", "LastMonth"],
    true,
  ),
  clean: cleanStringInput,
  default: "",
});

export const path = input({
  label: "Path",
  type: "string",
  example: "department",
  required: false,
  comments: "Installed equipment attachment path",
  placeholder: "department",
  clean: cleanStringInput,
});

export const serialNumber = input({
  label: "Serial Number",
  type: "string",
  example: "1234567890",
  required: false,
  comments: "Serial number of the installed equipment",
  placeholder: "1234567890",
  clean: cleanStringInput,
});

export const manufacturer = input({
  label: "Manufacturer",
  type: "string",
  example: "Test Manufacturer",
  required: false,
  comments: "Manufacturer of the installed equipment",
  placeholder: "Test Manufacturer",
  clean: cleanStringInput,
});

export const model = input({
  label: "Model",
  type: "string",
  example: "Test Model",
  required: false,
  comments: "Model of the installed equipment",
  placeholder: "Test Model",
  clean: cleanStringInput,
});

export const installedEquipmentCost = input({
  label: "Cost",
  type: "string",
  example: "100.00",
  required: false,
  comments: "Cost of the installed equipment",
  placeholder: "100.00",
  clean: cleanNumberInput,
});

export const manufacturerWarrantyStart = input({
  label: "Manufacturer Warranty Start",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Manufacturer warranty start date",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const manufacturerWarrantyEnd = input({
  label: "Manufacturer Warranty End",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Manufacturer warranty end date",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const serviceProviderWarrantyStart = input({
  label: "Service Provider Warranty Start",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Service Provider Warranty Start date",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const serviceProviderWarrantyEnd = input({
  label: "Service Provider Warranty End",
  type: "string",
  example: "2021-01-01T00:00:00Z",
  required: false,
  comments: "Service Provider Warranty End date",
  placeholder: "2021-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const attachments = input({
  label: "Attachments",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(
    [
      {
        alias: "string",
        fileName: "string",
        type: {},
        url: "string",
      },
    ],
    null,
    2,
  ),
  comments: "List of attachments",
  clean: cleanCodeInput,
});

export const file = input({
  label: "Attachment File",
  type: "data",
  required: true,
  comments: "Reference a file from another action. Must be a file type.",
  clean: util.types.toData,
});

export const fileName = input({
  label: "File Name",
  type: "string",
  example: "Test File",
  required: true,
  comments: "Name of the file",
  placeholder: "Test File",
  clean: cleanStringInput,
});

export const installedEquipmentId = input({
  label: "Installed Equipment ID",
  type: "string",
  example: "1234567890",
  required: true,
  comments: "ID of the installed equipment",
  placeholder: "1234567890",
  clean: cleanStringInput,
  dataSource: "selectInstalledEquipment",
});

export const jobAppointmentId = input({
  label: "Job Appointment ID",
  type: "string",
  example: "1234567890",
  required: true,
  comments: "ID of the job appointment",
  placeholder: "1234567890",
  clean: cleanNumberInput,
  dataSource: "selectAppointment",
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  comments:
    "If true, fetch all records, if false, will use the pageSize and page parameters",
  clean: cleanBooleanInput,
});
