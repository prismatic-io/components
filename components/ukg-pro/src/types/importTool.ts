






export interface ImportXmlDataResponse {
  stagingId: string;
  dateTimeCreated: string;
  fileName: string;
  message?: string;
}


export interface ImportStatusResponse {
  stagingId: string;
  status: "Pending" | "Processing" | "Completed" | "Failed";
  statusCode: string;
  dateTimeCreated: string;
  dateTimeStarted?: string;
  dateTimeCompleted?: string;
  fileName: string;
  totalRecords?: number;
  processedRecords?: number;
  successfulRecords?: number;
  failedRecords?: number;
  percentComplete?: number;
}


export interface TransactionStatusResponse {
  stagingId: string;
  transactionName: string;
  transactionType: string;
  status: string;
  statusCode: string;
  dateTimeCreated: string;
  dateTimeCompleted?: string;
  fileName: string;
}


export interface FileStatusResponse {
  stagingId: string;
  fileName: string;
  fileStatus: string;
  fileStatusCode: string;
  dateTimeUploaded: string;
  dateTimeProcessed?: string;
  fileSizeBytes?: number;
  transactionCount?: number;
  validationStatus?: string;
  validationStatusCode?: string;
  validationErrors?: ValidationError[];
}


export interface ValidationError {
  recordNumber?: number;
  fieldName?: string;
  errorCode: string;
  errorMessage: string;
}


export interface ImportResultItem {
  recordNumber: number;
  employeeNumber?: string;
  employeeName?: string;
  status: "Success" | "Failed" | "Warning";
  statusCode: string;
  message?: string;
  errorCode?: string;
}


export interface ImportSummary {
  totalRecords: number;
  successfulRecords: number;
  failedRecords: number;
  warningRecords: number;
}


export interface FileSummaryResponse {
  stagingId: string;
  fileName: string;
  transactionType: string;
  transactionTypeCode: string;
  dateTimeCreated: string;
  dateTimeCompleted?: string;
  status: string;
  statusCode: string;
  summary: ImportSummary;
  results?: ImportResultItem[];
}
