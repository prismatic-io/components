import { util } from "@prismatic-io/spectral";
import {
  carrierCode,
  confirmation,
  connectionInput,
  labelAdditionalFieldsInput,
  serviceCode,
  shipDate,
  testLabel,
} from "../common";
import { orderId } from "./common";

export const createLabelForOrderInputs = {
  connectionInput,
  orderIdInput: { ...orderId, required: true, clean: util.types.toString },
  carrierCode,
  serviceCode,
  confirmation,
  shipDate,
  testLabel,
  additionalFields: labelAdditionalFieldsInput,
};
