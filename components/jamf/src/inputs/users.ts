import { structuredObjectInput } from "@prismatic-io/spectral";
import { connection, fetchAll, filter, page, pageSize, sort } from "./common";
const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: { page, pageSize },
});
export const listUsersInputs = {
  connection,
  fetchAll,
  pagination,
  sort,
  filter,
};
