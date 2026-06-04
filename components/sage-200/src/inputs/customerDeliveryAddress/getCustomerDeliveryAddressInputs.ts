import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const deliveryAddressId = input({
  label: "Delivery Address ID",
  comments: "The ID of the customer delivery addresses to retrieve.",
  type: "string",
  required: true,
  example: "82780",
  placeholder: "82780",
  dataSource: "selectCustomerDeliveryAddress",
  clean: cleanStringInput,
});

export default {
  deliveryAddressId,
};
