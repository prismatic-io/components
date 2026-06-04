import { connectionInput } from "./common";
import { companyId } from "./employee";





export const selectCompanyInputs = {
  connection: connectionInput,
};

export const selectJobInputs = {
  connection: connectionInput,
  companyId: { ...companyId, required: false, dataSource: undefined },
};

export const selectLocationInputs = {
  connection: connectionInput,
  companyId: { ...companyId, required: false, dataSource: undefined },
};

export const selectPositionInputs = {
  connection: connectionInput,
  companyId: { ...companyId, required: false, dataSource: undefined },
};
