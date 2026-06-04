import { input } from "@prismatic-io/spectral";
import { BATCH_REQUEST_BODY_EXAMPLE } from "../constants";
import { cleanBatchRequestItems } from "../actionUtils";

export const batchRequestItems = input({
  label: "Batch Request Items",
  type: "code",
  language: "json",
  required: true,
  example: JSON.stringify(BATCH_REQUEST_BODY_EXAMPLE, null, 2),
  comments:
    "An array of batch request items to be executed; see https://developer.intuit.com/app/developer/qbo/docs/api/accounting/all-entities/batch for detailed information.",
  clean: cleanBatchRequestItems,
});
