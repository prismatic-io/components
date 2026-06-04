import { action } from "@prismatic-io/spectral";
import { updateARAdjustmentInputs } from "../inputs";
import {
  executeXmlRequest,
  getDateXmlTags,
  getXmlTagOrEmptyString,
  handleSageError,
} from "../utils";
import { updateARAdjustmentPayload } from "../examplePayloads/updateARAdjustmentPayload";

export const updateARAdjustment = action({
  display: {
    label: "Update AR Adjustment",
    description: "Update an existing AR Adjustment.",
  },
  perform: async (
    context,
    {
      connection,
      keyId,
      customerIdInput,
      dateCreatedInput,
      datePostedInput,
      descriptionInput,
      currencyInput,
      exchRateTypeInput,
      adjustmentNoInput,
      arAdjustmentLineItemsInput,
      actionInput,
      invoiceNoInput,
    },
  ) => {
    const NO_CHARACTERS = 0;

    const action = `<update_aradjustment key="${keyId}">
    ${getXmlTagOrEmptyString("customerid", customerIdInput)}
    ${
      dateCreatedInput.length > NO_CHARACTERS
        ? getDateXmlTags(dateCreatedInput, "datecreated")
        : ""
    }
    ${
      datePostedInput.length > NO_CHARACTERS
        ? getDateXmlTags(datePostedInput, "dateposted")
        : ""
    }
      ${getXmlTagOrEmptyString("adjustmentno", adjustmentNoInput)}
      ${getXmlTagOrEmptyString("action", actionInput)}
      ${getXmlTagOrEmptyString("invoiceno", invoiceNoInput)}
    ${getXmlTagOrEmptyString("description", descriptionInput)}
    ${getXmlTagOrEmptyString("currency", currencyInput)}
    ${getXmlTagOrEmptyString("exchratetype", exchRateTypeInput)}
    ${
      arAdjustmentLineItemsInput.length > NO_CHARACTERS
        ? `<updatearadjustmentitems>${arAdjustmentLineItemsInput}</updatearadjustmentitems>`
        : ""
    }
</update_aradjustment>`;

    const responseFromSage = await executeXmlRequest(
      connection,
      action,
      context.debug.enabled,
    );

    handleSageError(responseFromSage);

    return {
      data: responseFromSage,
    };
  },
  inputs: updateARAdjustmentInputs,
  examplePayload: updateARAdjustmentPayload,
});
