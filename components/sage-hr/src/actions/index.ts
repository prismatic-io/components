import company from "./company";
import documents from "./documents";
import employees from "./employees";
import projects from "./projects";
import rawRequest from "./rawRequest";
import { timeClockingInAndOut } from "./timeClockingInAndOut";
import timeoff from "./timeoff";

export default {
  ...company,
  ...documents,
  ...employees,
  ...projects,
  ...timeoff,
  rawRequest,
  timeClockingInAndOut,
};
