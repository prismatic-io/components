import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const createOrderInputs = {
  connection,
  dealId: input({
    label: "Deal ID",
    placeholder: "Enter Deal ID",
    example: "12345678",
    comments: "The unique identifier of the deal.",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectDeal",
  }),
  discount: input({
    label: "Discount",
    comments: "Overall discount on the order in percents. Defaults to 0.",
    placeholder: "Enter discount percentage",
    example: "50",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};
