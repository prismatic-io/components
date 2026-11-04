import cards from "./cards";
import employees from "./employees";
import expenseRules from "./expenseRules";
import expenses from "./expenses";
import misc from "./misc";
import policies from "./policies";
import reports from "./reports";

export default {
  ...expenseRules,
  ...policies,
  ...reports,
  ...expenses,
  ...cards,
  ...employees,
  ...misc,
};
