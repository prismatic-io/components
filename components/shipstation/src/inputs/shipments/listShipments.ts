import { connectionInput, page, pageSize } from "../common";
import {
  createDateEnd,
  createDateStart,
  recipientCountryCode,
  recipientName,
  shipDateEnd,
  shipDateStart,
  trackingNumber,
} from "./common";

export const listShipmentsInputs = {
  connectionInput,
  trackingNumber,
  createDateStart,
  createDateEnd,
  shipDateStart,
  shipDateEnd,
  recipientName,
  recipientCountryCode,
  page,
  pageSize,
};
