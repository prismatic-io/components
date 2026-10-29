import { util } from "@prismatic-io/spectral";
import { connectionInput } from "../common";
import { orderId } from "./common";

export const deleteOrderInputs = {
  connectionInput,
  orderId: { ...orderId, required: true, clean: util.types.toString },
};
