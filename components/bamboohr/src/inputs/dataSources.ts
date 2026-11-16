import { connectionInput, employeeId } from "./common";

export const selectCompanyFileInputs = {
  connection: connectionInput,
};

export const selectEmployeeInputs = {
  connection: connectionInput,
};

export const selectEmployeeFileInputs = {
  connection: connectionInput,
  employeeId: {
    ...employeeId,
    dataSource: undefined,
  },
};
