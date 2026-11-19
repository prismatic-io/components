import {
  companyIdInput,
  connectionInput,
  fetchAll,
  paginationPageInput,
} from "./common";

export const listCompaniesInputs = {
  connection: connectionInput,
  fetchAll,
  page: paginationPageInput,
};

export const getCompanyInputs = {
  connection: connectionInput,
  companyId: companyIdInput,
};

export const listCompanyAdminsInputs = {
  connection: connectionInput,
  companyId: companyIdInput,
  fetchAll,
  page: paginationPageInput,
};
