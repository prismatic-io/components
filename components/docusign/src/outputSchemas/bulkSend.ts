import {
  bulkSendBatchStatusSchema,
  bulkSendBatchSummariesSchema,
  bulkSendingListSchema,
  bulkSendingListSummariesSchema,
} from "./definitions";

export const createBulkSendListOutputSchema = bulkSendingListSchema;

export const deleteBulkSendListOutputSchema = bulkSendingListSummariesSchema;

export const getBulkSendListOutputSchema = bulkSendingListSchema;

export const getBulkSendListsOutputSchema = bulkSendingListSummariesSchema;

export const updateBulkSendListOutputSchema = bulkSendingListSchema;

export const getBulkSendBatchStatusOutputSchema = bulkSendBatchStatusSchema;

export const getBulkSendBatchesOutputSchema = bulkSendBatchSummariesSchema;
