import { listCompanies } from "./companies";
import { listReportSuiteDimensions } from "./dimensions";
import { listReportSuiteMetrics } from "./metrics";
import { rawRequest } from "./misc";
import {
  getReportSuite,
  listReportSuites,
  listVirtualReportSuites,
  runReport,
} from "./reportSuites";
import { getCurrentUser } from "./users";

export default {
  listCompanies,
  listReportSuiteDimensions,
  listReportSuiteMetrics,
  getReportSuite,
  listReportSuites,
  listVirtualReportSuites,
  runReport,
  getCurrentUser,
  rawRequest,
};
