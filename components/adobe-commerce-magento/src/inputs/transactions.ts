import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  fetchAll,
  searchCriteriaConditionType,
  searchCriteriaCurrentPage,
  searchCriteriaField,
  searchCriteriaPageSize,
  searchCriteriaSortDirection,
  searchCriteriaSortField,
  searchCriteriaValue,
} from "./common";
export const transactionId = input({
  label: "Transaction ID",
  type: "string",
  required: true,
  comments:
    "The payment transaction to retrieve, identified by its Magento `transaction_id` rather than the payment gateway's own `txn_id`. Pick a transaction from the dropdown or supply the ID directly.",
  placeholder: "Enter a transaction ID",
  example: "1",
  dataSource: "selectTransaction",
  clean: util.types.toString,
});
export const getTransactionInputs = {
  connection: connectionInput,
  transactionId,
};
export const listTransactionsInputs = {
  connection: connectionInput,
  fetchAll,
  searchCriteriaCurrentPage,
  searchCriteriaPageSize,
  searchCriteriaConditionType,
  searchCriteriaField,
  searchCriteriaValue,
  searchCriteriaSortDirection,
  searchCriteriaSortField,
};
