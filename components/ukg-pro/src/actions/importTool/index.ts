
import { getFileStatus } from "./getFileStatus";
import { getFileSummary } from "./getFileSummary";
import { getStatus } from "./getStatus";
import { getTransactionStatus } from "./getTransactionStatus";
import { importXmlData } from "./importXmlData";

export default {
  getImportFileStatus: getFileStatus,
  getImportFileSummary: getFileSummary,
  getImportStatus: getStatus,
  getImportTransactionStatus: getTransactionStatus,
  importXmlData,
};
