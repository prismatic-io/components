import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const getOrderInputs = {
  connection,
  id: input({
    label: "Order ID",
    placeholder: "Enter order ID",
    example: "12345678",
    comments: "The unique identifier of the order to retrieve.",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectOrder",
  }),
};
