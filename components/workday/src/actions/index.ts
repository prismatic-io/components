import absenceManagement from "./absenceManagement";
import accountsPayable from "./accountsPayable";
import businessProcess from "./businessProcess";
import commonApi from "./commonApi";
import connect from "./connect";
import customerAccounts from "./customerAccounts";
import misc from "./misc";
import person from "./person";
import prismAnalytics from "./prismAnalytics";
import reports from "./reports";
import staffing from "./staffing";
import timeTracking from "./timeTracking";

export default {
  ...absenceManagement,
  ...accountsPayable,
  ...businessProcess,
  ...commonApi,
  ...connect,
  ...customerAccounts,
  ...misc,
  ...person,
  ...prismAnalytics,
  ...reports,
  ...staffing,
  ...timeTracking,
};
