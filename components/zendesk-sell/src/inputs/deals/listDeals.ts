import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll } from "../common";

export const listDealsInputs = {
  connection,
  fetchAll,
  sortBy: input({
    label: "Sort By",
    comments:
      "A field to sort by. You can sort by filterable custom fields as well.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  ids: input({
    label: "IDs",
    comments: "Comma-separated list of deal IDs to be returned in a request.",
    placeholder: "Enter comma-separated IDs",
    example: "12345678,87654321",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  includes: input({
    label: "Includes",
    comments:
      "Comma-separated list of one or more resources related to a deal.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  creatorId: input({
    label: "Creator ID",
    comments:
      "Unique identifier of the user the deal was created by. Returns all deals created by the user.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  ownerId: input({
    label: "Owner ID",
    placeholder: "Enter Owner ID",
    example: "12345678",
    comments:
      "Unique identifier of the user the deal is owned by. Returns all deals owned by the user.",
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

  organizationId: input({
    label: "Organization ID",
    comments: "Unique identifier of an organization.",
    type: "string",
    required: false,
    clean: util.types.toString,
    dataSource: "selectContact",
  }),

  hot: input({
    label: "Hot",
    comments: "Indicator of whether or not the deal is hot.",
    placeholder: "Select whether deal is hot",
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

  sourceId: input({
    label: "Source ID",
    placeholder: "Enter Source ID",
    example: "12345678",
    comments: "ID of the Source.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  stageId: input({
    label: "Stage ID",
    placeholder: "Enter Stage ID",
    example: "12345678",
    comments: "ID of the Stage.",
    type: "string",
    required: false,
    clean: util.types.toString,
    dataSource: "selectStage",
  }),

  name: input({
    label: "Name",
    placeholder: "Enter name",
    comments: "Name of the deal.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  value: input({
    label: "Value",
    comments:
      "Value of the deal. We encourage you to use a string with two decimal places.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  estimatedCloseDate: input({
    label: "Estimated Close Date",
    comments: "Estimated close date of the deal.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  customFields: input({
    label: "Custom Field",
    comments: "Filterable custom field key-value pairs.",
    placeholder: "Enter custom field key-value pairs",
    type: "string",
    collection: "keyvaluelist",
    required: false,
    example: "key: external_id value: SKU01",
  }),

  inclusive: input({
    label: "Inclusive",
    comments:
      "Indicates how filters should be combine. true value, the default, uses AND logic. false value uses OR logic to combine filters.",
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
  page: input({
    label: "Page",
    comments:
      "Page number to start from. Page numbering starts at 1, and omitting the page parameter will return the first page.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  perPage: input({
    label: "Per Page",
    comments:
      "Number of records to return per page. Default limit is _25_ and the maximum number that can be returned is _100_.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};
