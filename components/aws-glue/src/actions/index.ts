import { getJobRun } from "./getJobRun";
import { listCrawlers } from "./listCrawlers";
import { listjobs as listJobs } from "./listJobs";
import { listTriggers } from "./listTriggers";
import { startCrawler } from "./startCrawler";
import { startJobRun } from "./startJobRun";
import { startTrigger } from "./startTrigger";
import { stopCrawler } from "./stopCrawler";
import { stopJobRun } from "./stopJobRun";
import { stopTrigger } from "./stopTrigger";

export default {
  listCrawlers,
  listTriggers,
  getJobRun,
  startCrawler,
  startTrigger,
  startJobRun,
  stopCrawler,
  stopJobRun,
  stopTrigger,
  listJobs,
};
