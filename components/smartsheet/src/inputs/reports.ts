import { connectionInput, modifiedSince, pagination, reportId } from "./common";
export const getReportInputs = {
  connection: connectionInput,
  reportId,
  pagination,
};
export const getReportsInputs = {
  connection: connectionInput,
  modifiedSince,
};
