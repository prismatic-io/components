import { connectionInput, customerName } from "../../common";
import {
  orderStatusList,
  pageFullorders,
  pageSizeFulfillorders,
} from "../../orders/common";

export const selectOrdersInputs = {
  customerName: { ...customerName, required: false },
  orderStatusList: { ...orderStatusList, required: false },
  pageFullorders: { ...pageFullorders, required: false },
  pageSizeFulfillorders: { ...pageSizeFulfillorders, required: false },
  connectionInput,
};
