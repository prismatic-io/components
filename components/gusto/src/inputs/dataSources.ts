import { companyIdInput, connectionInput } from "./common";

export const selectCompanyInputs = {
  connection: connectionInput,
};

export const selectEmployeeInputs = {
  connection: connectionInput,
  companyId: { ...companyIdInput, dataSource: undefined },
};

export const selectPayScheduleInputs = {
  connection: connectionInput,
  companyId: { ...companyIdInput, dataSource: undefined },
};
