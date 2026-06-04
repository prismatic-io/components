import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const paymentMethodId = input({
  label: "Payment Method ID",
  placeholder: "Enter payment method ID",
  type: "string",
  required: false,
  example: "2",
  comments: "The ID of the payment method associated with this transaction.",
  clean: cleanStringInput,
});

export const paymentMethodName = input({
  label: "Payment Method Name",
  placeholder: "Enter payment method name",
  type: "string",
  required: false,
  example: "Check",
  comments: "The name of the payment method associated with this transaction.",
  clean: cleanStringInput,
});

export const totalAmount = input({
  label: "Total Amount",
  placeholder: "Enter total amount",
  type: "string",
  required: true,
  example: "150",
  comments: "The total amount on the receipt.",
  clean: util.types.toString,
});
