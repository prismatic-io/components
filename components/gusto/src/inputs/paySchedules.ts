import {
  companyIdInput,
  connectionInput,
  fetchAll,
  paginationPageInput,
  payScheduleIdInput,
} from "./common";

export const listPaySchedulesInputs = {
  connection: connectionInput,
  companyId: companyIdInput,
  fetchAll,
  page: paginationPageInput,
};

export const getPayScheduleInputs = {
  connection: connectionInput,
  companyId: companyIdInput,
  payScheduleId: payScheduleIdInput,
};
