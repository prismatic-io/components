import { structuredObjectInput } from "@prismatic-io/spectral";
import { connectionInput, cursor, fetchAll, limit } from "./common";
const listTeamsPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Cursor and page-size controls for paging through results.",
  inputs: { limit, cursor },
});
export const listTeamsInputs = {
  connection: connectionInput,
  fetchAll,
  pagination: listTeamsPagination,
};
