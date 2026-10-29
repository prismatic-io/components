import crawlersActions from "./crawlers";
import jobsActions from "./jobs";
import triggersActions from "./triggers";

export default {
  ...crawlersActions,
  ...jobsActions,
  ...triggersActions,
};
