import { input, util } from "@prismatic-io/spectral";
import { mapModel } from "../../util";
import { BUSINESS_PARTNER_TYPES } from "../../constants";

export const cardCode = input({
  label: "Card Code",
  type: "string",
  comments: "The unique code identifying the business partner (customer or supplier).",
  example: "C20000",
  placeholder: "Enter business partner code",
  required: true,
  clean: util.types.toString,
});

export const cardName = input({
  label: "Card Name",
  type: "string",
  comments: "The name of the business partner (customer or supplier).",
  example: "Acme Corporation",
  placeholder: "Enter business partner name",
  required: true,
  clean: util.types.toString,
});

export const cardType = input({
  label: "Card Type",
  type: "string",
  comments:
    "The type of the business partner: Customer (cCustomer), Supplier (cSupplier), or Lead (cLid).",
  required: true,
  model: mapModel(BUSINESS_PARTNER_TYPES),
  clean: util.types.toString,
});
