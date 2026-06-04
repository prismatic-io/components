import { input } from "@prismatic-io/spectral";
import {
  $filter,
  $orderby,
  $skip,
  $top,
  connection,
  getAllData,
} from "../shared";

const DOCUMENTATION_COMMENTS = `See [Karbon API documentation](https://karbonhq.github.io/karbon-api-reference/#get-/v3/Contacts) for more information.`;

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
      {
        value: "FullName",
        label: "Full Name",
      },
      {
        value: "FullName desc",
        label: "Full Name Descending",
      },
      {
        value: "LastModifiedDateTime",
        label: "Last Modified Date Time",
      },
      {
        value: "LastModifiedDateTime desc",
        label: "Last Modified Date Time Descending",
      },
    ],
  }),
  getAllData,
};
