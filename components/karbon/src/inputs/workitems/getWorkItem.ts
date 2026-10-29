import { input } from "@prismatic-io/spectral";
import { connection } from "../shared";
import { workItemkey } from "./shared";

export default {
  connection,
  workItemkey: input({
    ...workItemkey,
    comments: `${workItemkey.comments} to get the Work Item for.`,
  }),
};
