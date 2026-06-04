import { connectionInput, shipTo } from "../common";
import {
  billTo,
  orderAdditionalFieldsInput,
  orderDate,
  orderKey,
  orderNumber,
  orderStatus,
} from "./common";

export const createOrUpdateOrderInputs = {
  connectionInput,
  orderNumber,
  orderDate,
  orderStatus,
  orderKey,
  billTo,
  shipTo,
  additionalFields: orderAdditionalFieldsInput,
};
