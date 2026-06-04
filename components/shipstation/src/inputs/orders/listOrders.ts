import { connectionInput, customerName } from "../common";
import { orderStatus, pageFullorders, pageSizeFulfillorders } from "./common";

export const listOrdersInputs = {
  connectionInput,
  customerName,
  orderStatusList: orderStatus,
  pageFullorders,
  pageSizeFulfillorders,
};
