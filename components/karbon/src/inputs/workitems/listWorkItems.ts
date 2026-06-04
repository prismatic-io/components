







import { input } from "@prismatic-io/spectral";
import {
  $filter,
  $orderby,
  $skip,
  $top,
  connection,
  getAllData,
} from "../shared";

const DOCUMENTATION_COMMENTS = `See [Karbon API documentation](https://karbonhq.github.io/karbon-api-reference/#get-/v3/WorkItems) for more information.`;

export default {
  connection,
  $filter: input({
    ...$filter,
    comments: `${$filter.comments} ${DOCUMENTATION_COMMENTS}`,
  }),
  $top,
  $skip,
  $orderby: input({
    ...$orderby,
    model: [
      { value: "StartDate", label: "Start Date" },
      { value: "StartDate desc", label: "Start Date Descending" },
      { value: "DeadlineDate", label: "Deadline Date" },
      { value: "DeadlineDate desc", label: "Deadline Date Descending" },
    ],
  }),
  getAllData,
};
