import { input } from "@prismatic-io/spectral";
import { paymentDistributionPayload } from "../exampleInputs";
import { cleanObject, cleanString } from "../util";
import { $filter, $select, aoid, connection } from "./common";
const paymentDistribution = input({
  label: "Payment Distribution",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The payment distribution data structure for direct deposit configuration.",
  placeholder: "Enter payment distribution JSON",
  example: JSON.stringify(paymentDistributionPayload, null, 2),
  clean: cleanObject,
});
const workAssignmentId = input({
  label: "Work Assignment ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the worker's work assignment for pay distribution updates.",
  placeholder: "Enter Work Assignment ID",
  example: "G3STHDEHFMJ3BY3N",
  clean: cleanString,
});
export const getPaymentDistributionsInputs = {
  aoid,
  $select,
  $filter,
  connection,
};
export const getWorkerPaymentDistributionsMetaInputs = {
  $select,
  connection,
};
export const updateWorkerPayDistributionInputs = {
  aoid,
  workAssignmentId,
  paymentDistribution,
  connection,
};
