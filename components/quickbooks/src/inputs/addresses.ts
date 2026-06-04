import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";

export const line1 = input({
  label: "Billing Line 1",
  placeholder: "Enter billing line 1",
  type: "string",
  example: "Karen Pye",
  required: false,
  comments: "Line 1 of the billing address.",
  clean: cleanStringInput,
});

export const line2 = input({
  label: "Billing Line 2",
  placeholder: "Enter billing line 2",
  example: "Pye's Cakes",
  type: "string",
  required: false,
  comments: "Line 2 of the billing address.",
  clean: cleanStringInput,
});

export const line3 = input({
  label: "Billing Line 3",
  placeholder: "Enter billing line 3",
  type: "string",
  required: false,
  comments: "Line 3 of the billing address.",
  example: "350 Mountain View Dr.",
  clean: cleanStringInput,
});

export const line4 = input({
  label: "Billing Line 4",
  placeholder: "Enter billing line 4",
  type: "string",
  example: "South Orange, NJ  07079",
  required: false,
  comments: "Line 4 of the billing address.",
  clean: cleanStringInput,
});

export const lat = input({
  label: "Billing Latitude",
  placeholder: "Enter latitude",
  type: "string",
  example: "40.7489277",
  required: false,
  comments: "The latitude of the billing address.",
  clean: cleanStringInput,
});

export const long = input({
  label: "Billing Longitude",
  placeholder: "Enter longitude",
  example: "-74.2609903",
  type: "string",
  required: false,
  comments: "The longitude of the billing address.",
  clean: cleanStringInput,
});

export const billingAddressId = input({
  label: "Billing Address ID",
  placeholder: "Enter billing address ID",
  type: "string",
  required: false,
  example: "78",
  comments: "The unique identifier of the billing address.",
  clean: cleanStringInput,
});
