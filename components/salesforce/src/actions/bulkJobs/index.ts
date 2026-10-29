import { abortBulkJob } from "./abortBulkJob";
import { bulkInsertRecords } from "./bulkInsertRecords";
import { bulkUpsertRecords } from "./bulkUpsertRecords";
import { createBulkJob } from "./createBulkJob";
import { completeUploadBulkJob } from "./completeUploadBulkJob";
import { deleteBulkJob } from "./deleteBulkJob";
import { getJobFailedRecordResults } from "./getJobFailedRecordResults";
import { getJobSuccessfulRecordResults } from "./getJobSuccessfulRecordResults";
import { getBulkJob } from "./getBulkJob";
import { listBulkJobs } from "./listBulkJobs";
import { uploadJobData } from "./uploadJobData";

export default {
  abortBulkJob,
  bulkInsertRecords,
  bulkUpsertRecords,
  completeUploadBulkJob,
  createBulkJob,
  deleteBulkJob,
  listBulkJobs,
  getBulkJob,
  uploadJobData,
  getJobFailedRecordResults,
  getJobSuccessfulRecordResults,
};
