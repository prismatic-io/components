
import bills from "./bills";
import businessEntities from "./businessEntities";
import customAccounting from "./customAccountingField";
import departments from "./departments";
import generalLedgerAccounts from "./generalLedgerAccounts";
import locations from "./locations";
import { postSyncStatus } from "./postSyncStatus";
import { rawRequest } from "./rawRequest";
import reimbursements from "./reimbursements";
import transactions from "./transactions";
import vendors from "./vendors";

export default {
  
  ...bills,
  ...businessEntities,
  ...customAccounting,
  ...departments,
  ...generalLedgerAccounts,
  ...locations,
  ...reimbursements,
  ...transactions,
  ...vendors,
  postSyncStatus,
  rawRequest,
};
