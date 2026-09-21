import vendorsActions from "./vendors";
import customersActions from "./customers";
import contactsActions from "./contacts";
import invoicesActions from "./invoices";
import billsActions from "./bills";
import paymentsActions from "./payments";
import projectsActions from "./projects";
import arAdjustmentsActions from "./arAdjustments";
import arAdvancesActions from "./arAdvances";
import miscActions from "./misc";
export default {
  ...vendorsActions,
  ...customersActions,
  ...contactsActions,
  ...invoicesActions,
  ...billsActions,
  ...paymentsActions,
  ...projectsActions,
  ...arAdjustmentsActions,
  ...arAdvancesActions,
  ...miscActions,
};
