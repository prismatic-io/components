import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const deleteOrderInputs = {
  connection,
  id: input({
    label: "Order ID",
    placeholder: "Enter order ID",
    example: "12345678",
    comments: "The unique identifier of the order to delete.",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectOrder",
  }),
};
