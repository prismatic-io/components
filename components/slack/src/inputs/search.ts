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





export const searchAllInputs = {
  connection: connectionInput,
  query,
  count: {
    ...limit,
    label: "Count",
    comments: "The number of items to return per page.",
  },
  page,
  highlight,
  sort: sortSearch,
  sort_dir,
  team_id,
};
