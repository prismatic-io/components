import absencesActions from "./absences";
import assignmentsActions from "./assignments";
import departmentsActions from "./departments";
import gradesActions from "./grades";
import jobsActions from "./jobs";
import locationsActions from "./locations";
import miscActions from "./misc";
import positionsActions from "./positions";
import workersActions from "./workers";
export default {
  ...absencesActions,
  ...assignmentsActions,
  ...departmentsActions,
  ...gradesActions,
  ...jobsActions,
  ...locationsActions,
  ...miscActions,
  ...positionsActions,
  ...workersActions,
};
