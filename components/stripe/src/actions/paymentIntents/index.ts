import { cancelPaymentIntent } from "./cancel";
import { capturePaymentIntent } from "./capture";
import { confirmPaymentIntent } from "./confirm";
import { createPaymentIntent } from "./create";
import { getPaymentIntent } from "./get";
import { listPaymentIntents } from "./list";
import { searchPaymentIntent } from "./search";
import { updatePaymentIntent } from "./update";

export default {
  cancelPaymentIntent,
  capturePaymentIntent,
  confirmPaymentIntent,
  createPaymentIntent,
  getPaymentIntent,
  listPaymentIntents,
  searchPaymentIntent,
  updatePaymentIntent,
};
