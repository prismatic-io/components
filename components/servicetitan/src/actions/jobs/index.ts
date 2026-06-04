import { cancelJob } from "./cancel";
import { listJobCancelReasons } from "./cancelReasons";
import { createJob } from "./create";
import { getJob } from "./get";
import { listJobs } from "./list";
import { updateJob } from "./update";

export default {
  createJob,
  listJobCancelReasons,
  cancelJob,
  updateJob,
  listJobs,
  getJob,
};
