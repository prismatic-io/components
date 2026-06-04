import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const updateOrderInputs = {
  connection,
  id: input({
    label: "Order ID",
    placeholder: "Enter order ID",
    example: "12345678",
    comments: "The unique identifier of the order to update.",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectOrder",
  }),
  discount: input({
    label: "Discount",
    comments: "Overall discount on the order in percents.",
    placeholder: "Enter discount percentage",
    example: "25",
    type: "string",
    required: true,
    clean: util.types.toString,
  }),
};
