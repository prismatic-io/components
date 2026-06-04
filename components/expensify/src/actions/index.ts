import { createExpense } from "./createExpense";
import expenseRules from "./expense-rules";
import { listCards } from "./listCards";
import policies from "./policies";
import { rawRequest } from "./rawRequest";
import reports from "./reports";
import { updateEmployee } from "./updateEmployee";

export default {
  ...expenseRules,
  ...policies,
  ...reports,
  createExpense,
  listCards,
  updateEmployee,
  rawRequest,
};
