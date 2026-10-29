import {
  carrierCode,
  connectionInput,
  serviceCode,
  shipDate,
  shipTo,
} from "../common";
import {
  packageCodeInput,
  shipFrom,
  shipmentAdditionalFieldsInput,
  weightInput,
} from "./common";

export const createShipmentLabelInputs = {
  connectionInput,
  carrierCode,
  serviceCode,
  packageCode: packageCodeInput,
  shipDate,
  weight: weightInput,
  shipTo,
  shipFrom,
  additionalFields: shipmentAdditionalFieldsInput,
};
