import { action, outputSchema } from "@prismatic-io/spectral";
import { updateARAdvanceInputs } from "../../inputs";
import {
  executeXmlRequest,
  getDateXmlTags,
  getXmlTagOrEmptyString,
  handleSageError,
} from "../../util";
import { updateARAdvanceExamplePayload } from "../../examplePayloads";
import { updateARAdvanceOutputSchema } from "../../outputSchemas";
export const updateARAdvance = action({
  display: {
    label: "Update AR Advance",
    description: "Updates an existing AR Advance.",
  },
  performSafety: "notAllowed",
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
  examplePayload: updateARAdvanceExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateARAdvanceOutputSchema,
  }),
  examplePerform: async () => ({ data: updateARAdvanceExamplePayload.data }),
});
