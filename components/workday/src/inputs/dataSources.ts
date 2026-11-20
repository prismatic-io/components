import { eventWorkerId } from "./businessProcess";
import { connection, organizationTypeId, tenant } from "./common";

export const selectBusinessProcessTypeInputs = {
  connection,
};

export const selectCurrencyInputs = {
  connection,
};

export const selectCustomerInputs = {
  connection,
};

export const selectDataChangeInputs = {
  connection,
  tenant,
};

export const selectEventInputs = {
  connection,
  workerId: {
    ...eventWorkerId,
    comments:
      "Identifies the worker whose business process events to list. Workday returns no events without a worker.",
    dataSource: undefined,
  },
};

export const selectInvoiceInputs = {
  connection,
};

export const selectMessageTemplateInputs = {
  connection,
};

export const selectNotificationTypeInputs = {
  connection,
};

export const selectOrganizationInputs = {
  connection,
  organizationTypeId,
};

export const selectPersonInputs = {
  connection,
};

export const selectSupervisoryOrganizationInputs = {
  connection,
};

export const selectSupplierInvoiceRequestInputs = {
  connection,
};

export const selectTableInputs = {
  connection,
  tenant,
};

export const selectWorkerInputs = {
  connection,
};
