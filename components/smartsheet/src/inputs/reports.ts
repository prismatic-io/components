import {
  connectionInput,
  modifiedSince,
  page,
  pageSize,
  reportId,
} from "./common";

export const getReportInputs = {
  connection: connectionInput,
  reportId,
  page,
  pageSize,
};

export const getReportsInputs = {
  connection: connectionInput,
  modifiedSince,
};
