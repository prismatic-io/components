import {
  connectionInput,
  globalCompanyIdInput,
  reportSuiteIdInput,
} from "../common";
import { dimensionInput, reportRequestBodyInput } from "./common";

export const runReportInputs = {
  connection: connectionInput,
  globalCompanyId: globalCompanyIdInput,
  reportSuiteId: reportSuiteIdInput,
  dimension: dimensionInput,
  reportRequestBody: reportRequestBodyInput,
};
