import { connection, organization, uuid, sort, form } from "./common";
export const getRoutingFormInputs = {
  connection,
  organization: { ...organization, dataSource: "organizations" },
  uuid: { ...uuid, dataSource: "routingForms" },
};
export const getRoutingFormSubmissionInputs = {
  connection,
  uuid,
};
export const listRoutingFormSubmissionsInputs = {
  connection,
  organization: { ...organization, dataSource: "organizations" },
  form,
  sort: {
    ...sort,
    model: [
      {
        label: "",
        value: "",
      },
      {
        label: "Created At (Ascending)",
        value: "created_at:asc",
      },
      {
        label: "Created At (Descending)",
        value: "created_at:desc",
      },
    ],
    comments:
      "Order results by the specified field and direction. Supported fields are: created_at. Sort direction is specified as: asc, desc.",
  },
};
export const listRoutingFormsInputs = {
  connection,
  organization: {
    ...organization,
    required: true,
    dataSource: "organizations",
    comments:
      "View organization routing forms associated with the organization's URI.",
  },
  sort: {
    ...sort,
    comments:
      "Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: created_at. Sort direction is specified as: asc, desc.",
    example: "created_at:desc",
  },
};
