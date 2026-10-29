import { input } from "@prismatic-io/spectral";
import { connection, $filter, $top, $skip, getAllData } from "../shared";

const DOCUMENTATION_COMMENTS = `See [Karbon API documentation](https://karbonhq.github.io/karbon-api-reference/#get-/v3/Users) for more information.`;

export default {
  connection,
  $filter: input({
    ...$filter,
    comments: `${$filter.comments} ${DOCUMENTATION_COMMENTS}`,
  }),
  $top,
  $skip,
  getAllData,
};
