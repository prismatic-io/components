import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  regionAndDomain,
  project_id,
  workspace_id,
} from "./common";
export const bookmark_id = input({
  label: "Bookmark ID",
  type: "string",
  clean: util.types.toString,
  comments:
    "The ID of the Insights report. Find this in the URL: https://mixpanel.com/report/1/insights#report/YOUR_BOOKMARK_ID/example-report",
  placeholder: "Enter bookmark ID",
  required: true,
  example: "8947562",
});
export const queryInsightsSavedReportsInputs = {
  connection: connectionInput,
  regionAndDomain,
  bookmark_id,
  project_id,
  workspace_id,
};
