import { applications } from "./v1/applications";
import { candidatesNames } from "./v1/candidates";
import { customFields } from "./v1/customFields";
import { departments } from "./v1/departments";
import { jobs } from "./v1/jobs";
import { offices } from "./v1/offices";
import { usersNames } from "./v1/users";
import { applicationsV3 } from "./v3/applications";
import { candidatesV3 } from "./v3/candidates";
import { customFieldsV3 } from "./v3/customFields";
import { departmentsV3 } from "./v3/departments";
import { jobsV3 } from "./v3/jobs";
import { officesV3 } from "./v3/offices";
import { rejectionReasonsV3 } from "./v3/rejectionReasons";
import { usersV3 } from "./v3/users";

export default {
  applications,
  users: usersNames,
  offices,
  jobs,
  departments,
  customFields,
  candidates: candidatesNames,
  applicationsV3,
  candidatesV3,
  customFieldsV3,
  departmentsV3,
  jobsV3,
  officesV3,
  rejectionReasonsV3,
  usersV3,
};
