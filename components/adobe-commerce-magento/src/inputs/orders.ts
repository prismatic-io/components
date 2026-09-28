import { input, util } from "@prismatic-io/spectral";
import { entityJson } from "../constants";
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
export const entity = input({
  label: "Order",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The order to create, as a JSON object under an `entity` key. The default value lists every field the endpoint accepts; remove the ones that do not apply.",
  placeholder: "Enter the order as JSON",
  default: JSON.stringify(entityJson, null, 2),
  clean: util.types.toObject,
});
export const orderId = input({
  label: "Order ID",
  type: "string",
  required: true,
  comments:
    "The order to act on, identified by its Magento `entity_id` rather than the customer-facing increment ID. Pick an order from the dropdown or supply the ID directly.",
  placeholder: "Enter an order entity ID",
  example: "1",
  dataSource: "selectOrder",
  clean: util.types.toString,
});
export const cancelOrderInputs = {
  connection: connectionInput,
  orderId,
};
export const createOrderInputs = {
  connection: connectionInput,
  entity,
};
export const getOrderInputs = {
  connection: connectionInput,
  orderId,
};
export const listOrderItemsInputs = {
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
export const listOrdersInputs = {
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
