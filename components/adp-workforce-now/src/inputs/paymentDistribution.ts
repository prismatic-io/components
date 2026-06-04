import { input } from "@prismatic-io/spectral";
import { paymentDistributionPayload } from "../exampleInputs";
import { cleanObject, cleanString } from "../util";
import { connection } from "./common";
import { aoid } from "./workers";


export const paymentDistribution = input({
  label: "Payment Distribution",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The payment distribution data structure for direct deposit configuration.",
  example: JSON.stringify(paymentDistributionPayload, null, 2),
  clean: cleanObject,
});

export const workAssignmentId = input({
  label: "Work Assignment ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the worker's work assignment for pay distribution updates.",
  placeholder: "Enter Work Assignment ID",
  example: "G3STHDEHFMJ3BY3N",
  clean: cleanString,
});


export const updatePaymentDistributionInputs = {
  connection,
  aoid,
  workAssignmentId,
  paymentDistribution,
};
