import { input, util } from "@prismatic-io/spectral";

export const accountId = input({
  label: "Account ID",
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter account ID",
  type: "string",
  required: true,
  comments: "The ID of the account you want to retrieve data from.",
  dataSource: "selectAccount",
  clean: util.types.toString,
});

export const companyId = input({
  label: "Company ID",
  type: "string",
  required: true,
  comments: "The ID of the company you want to interact with.",
  example: "5d115c9c-44e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter company ID",
  dataSource: "listCompanies",
  clean: util.types.toString,
});
