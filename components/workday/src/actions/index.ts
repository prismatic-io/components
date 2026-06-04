import absenceManagement from "./absenceManagement";
import accountsPayable from "./accountsPayable";
import businessProcess from "./businessProcess";
import common from "./common";
import connect from "./connect";
import customerAccounts from "./customerAccounts";
import misc from "./misc";
import person from "./person";
import prismAnalytics from "./prismAnalytics";
import staffing from "./staffing";
import timeTracking from "./timeTracking";

export default {
  ...absenceManagement,
  ...accountsPayable,
  ...businessProcess,
  ...common,
  ...connect,
  ...customerAccounts,
  ...misc,
  ...person,
  ...prismAnalytics,
  ...staffing,
  ...timeTracking,
};
