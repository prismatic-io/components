import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const updateDealInputs = {
  connection,
  id: input({
    label: "Deal ID",
    comments: "The unique identifier of the deal to update.",
    placeholder: "Enter deal ID",
    example: "12345678",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectDeal",
  }),
  name: input({
    label: "Name",
    placeholder: "Enter name",
    comments: "Name of the deal.",
    example: "Q1 Enterprise Deal",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  value: input({
    label: "Value",
    comments: "Value of the deal in decimal format (e.g., two decimal places).",
    placeholder: "Enter deal value",
    example: "5000.00",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  currency: input({
    label: "Currency",
    comments:
      "The currency code for the deal value. If omitted, the account default currency is used.",
    placeholder: "Enter currency code",
    example: "USD",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  ownerId: input({
    label: "Owner ID",
    comments: "The unique identifier of the user who owns the deal.",
    placeholder: "Enter Owner ID",
    example: "12345678",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  hot: input({
    label: "Hot",
    comments: "When true, marks the deal as hot.",
    type: "string",
    default: "",
    model: [
      { label: "", value: "" },
      { label: "true", value: "true" },
      { label: "false", value: "false" },
    ],
    required: false,
    clean: util.types.toString,
  }),

  stageId: input({
    label: "Stage ID",
    comments: "The unique identifier of the pipeline stage for this deal.",
    placeholder: "Enter Stage ID",
    example: "12345678",
    type: "string",
    required: false,
    clean: util.types.toString,
    dataSource: "selectStage",
  }),

  lastStageChangeAt: input({
    label: "Last Stage Change At",
    comments:
      "Date and time when the deal was moved into the current stage in UTC (ISO8601 format).",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  addedAt: input({
    label: "Added At",
    comments:
      "Date and time that the deal was started in UTC (ISO8601 format).",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  sourceId: input({
    label: "Source ID",
    placeholder: "Enter Source ID",
    example: "12345678",
    comments: "ID of the deal Source.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  lossReasonId: input({
    label: "Loss Reason ID",
    placeholder: "Enter Loss Reason ID",
    example: "12345678",
    comments: "ID of the Loss Reason.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  unqualifiedReasonId: input({
    label: "Unqualified Reason ID",
    placeholder: "Enter Unqualified Reason ID",
    example: "12345678",
    comments: "ID of the Unqualify Reason.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  contactId: input({
    label: "Contact ID",
    placeholder: "Enter Contact ID",
    example: "87654321",
    comments: "Unique identifier of a primary contact.",
    type: "string",
    required: false,
    clean: util.types.toString,
    dataSource: "selectContact",
  }),

  estimatedCloseDate: input({
    label: "Estimated Close Date",
    comments: "Expected date when the deal will close.",
    placeholder: "Enter estimated close date (YYYY-MM-DD)",
    example: "2024-06-30",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  customizedWinLikelihood: input({
    label: "Customized Win Likelihood",
    comments: "User-provided win likelihood with value range 0-100.",
    placeholder: "Enter win likelihood (0-100)",
    example: "75",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  tags: input({
    label: "Tag",
    comments: "Tags to apply. You need to supply the entire set.",
    placeholder: "Enter tags",
    type: "string",
    collection: "valuelist",
    required: false,
  }),

  customFields: input({
    label: "Custom Field",
    comments: "Filterable custom field key-value pairs.",
    placeholder: "Enter custom field key-value pairs",
    type: "string",
    collection: "keyvaluelist",
    required: false,
  }),
};
