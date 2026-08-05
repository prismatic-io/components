import { connection, customerId } from "./common";
export const selectLocationInputs = {
  connection,
};
export const selectBookingInputs = {
  connection,
};
export const selectTechnicianInputs = {
  connection,
};
export const selectInstalledEquipmentInputs = {
  connection,
};
export const selectInvoiceInputs = {
  connection,
};
export const selectPaymentInputs = {
  connection,
};
export const selectUserRoleInputs = {
  connection,
};
export const selectJobInputs = {
  connection,
};
export const selectCustomerContactInputs = {
  connection,
  customerId: {
    ...customerId,
    comments: "The customer ID to fetch contacts for.",
    clean: (value: unknown) => value as string,
    dataSource: undefined,
  },
};
export const selectBusinessUnitInputs = {
  connection,
};
export const selectJobCancelReasonInputs = {
  connection,
};
export const selectProjectInputs = {
  connection,
};
export const selectCustomersInputs = {
  connection,
};
export const selectAppointmentInputs = {
  connection,
};
