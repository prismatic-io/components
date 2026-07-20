import { structuredObjectInput } from "@prismatic-io/spectral";
import {
  connectionInput,
  highlight,
  limit,
  page,
  query,
  sort_dir,
  sortSearch,
  team_id,
} from "./common";
const searchAllPagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page and page-size controls.",
  inputs: {
    count: {
      ...limit,
      label: "Count",
      comments: "The number of items to return per page.",
    },
    page,
  },
});
export const searchAllInputs = {
  connection: connectionInput,
  query,
  pagination: searchAllPagination,
  highlight,
  sort: sortSearch,
  sort_dir,
  team_id,
};
