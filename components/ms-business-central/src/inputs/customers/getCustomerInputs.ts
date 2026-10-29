import { input, util } from "@prismatic-io/spectral";

export const customerId = input({
  label: "Customer ID",
  type: "string",
  comments: "The unique identifier of the customer.",
  required: true,
  example: "8ba01a7a-5734-ef11-8409-7c1e5213ec0e",
  placeholder: "8ba01a7a-5734-ef11-8409-7c1e5213ec0e",
  dataSource: "listCustomers",
  clean: util.types.toString,
});
