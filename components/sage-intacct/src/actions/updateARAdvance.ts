import { action } from "@prismatic-io/spectral";
import { updateARAdvanceInputs } from "../inputs";
import {
  executeXmlRequest,
  getDateXmlTags,
  getXmlTagOrEmptyString,
  handleSageError,
} from "../utils";
import { updateARAdvancePayload } from "../examplePayloads/updateARAdvancePayload";

export const updateARAdvance = action({
  display: {
    label: "Update AR Advance",
    description: "Update an existing AR Advance.",
  },
  perform: async (
    context,
    {
      connection,
      recordNoInput,
      paymentDateInput,
      receiptDateInput,
      paymentMethodInput,
      undepositedAccountNoInput,
      financialEntityInput,
      arAdvanceItemsInput,
      additionalXmlTagsInput,
    },
  ) => {
    const NO_CHARACTERS = 0;
    const action = `<update>
  <ARADVANCE>
    <RECORDNO>${recordNoInput}</RECORDNO>
    ${
      paymentDateInput.length > NO_CHARACTERS
        ? getDateXmlTags(paymentDateInput, "PAYMENTDATE")
        : ""
    }
    ${
      receiptDateInput.length > NO_CHARACTERS
        ? getDateXmlTags(receiptDateInput, "RECEIPTDATE")
        : ""
    }
    ${getXmlTagOrEmptyString("PAYMENTMETHOD", paymentMethodInput)}
    ${getXmlTagOrEmptyString("FINANCIALENTITY", financialEntityInput)}
    ${getXmlTagOrEmptyString("UNDEPOSITEDACCOUNTNO", undepositedAccountNoInput)}
    ${
      arAdvanceItemsInput.length > NO_CHARACTERS
        ? `<ARADVANCEITEMS>${arAdvanceItemsInput}</ARADVANCEITEMS>`
        : ""
    }
    ${additionalXmlTagsInput}
  </ARADVANCE>
</update>`;

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
  inputs: updateARAdvanceInputs,
  examplePayload: updateARAdvancePayload,
});
