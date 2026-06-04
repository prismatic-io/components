import { input } from "@prismatic-io/spectral";
import { ORDER_STATUSES } from "../constants";
import type { OrderStatus } from "../types";
import { cleanString } from "../util";

export const orderStatus = input({
  label: "Order Status",
  type: "string",
  required: false,
  comments: "The current status of the order.",
  model: ORDER_STATUSES.map((value) => ({
    label: value,
    value,
  })),
  clean: (value: unknown) => cleanString(value) as OrderStatus,
});

export const messsage = input({
  label: "Message",
  type: "string",
  required: false,
  comments: "A message to include with the order status update.",
  example: "Order has been delivered",
  placeholder: "Enter message",
  clean: cleanString,
});

export const trackingnumber = input({
  label: "Tracking Number",
  type: "string",
  required: false,
  comments: "The tracking number for the order shipment.",
  example: "1Z999AA10123456784",
  placeholder: "Enter tracking number",
  clean: cleanString,
});
