import atsCandidates from "./atsCandidates";
import companies from "./companies";
import companyActivity from "./companyActivity";
import customFields from "./customFields";
import departments from "./departments";
import employees from "./employees";
import groups from "./groups";
import leaveRequests from "./leaveRequests";
import levels from "./levels";
import markAppInstalled from "./markAppInstalled";
import me from "./me";
import rawRequest from "./rawRequest";
import saml from "./saml";
import teams from "./teams";
import workLocations from "./workLocations";

export default {
  ...companies,
  ...departments,
  ...employees,
  ...workLocations,
  ...customFields,
  ...teams,
  ...levels,
  ...me,
  ...groups,
  ...leaveRequests,
  ...saml,
  ...atsCandidates,
  ...companyActivity,
  ...markAppInstalled,
  rawRequest,
};
