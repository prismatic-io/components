import { createJob } from "./createJob";
import { deleteJob } from "./deleteJob";
import { getJob } from "./getJob";
import { getMediaOfJob } from "./getMediaJob";
import { getJobPreset } from "./getPreset";
import { listJobsByCampaign } from "./listByCampaign";
import { listJobs } from "./listJobs";
import { updateJob } from "./updateJob";

export default {
  listJobs,
  listJobsByCampaign,
  getJob,
  getJobPreset,
  getMediaOfJob,
  createJob,
  updateJob,
  deleteJob,
};
