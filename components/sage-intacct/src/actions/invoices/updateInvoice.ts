import { action, outputSchema } from "@prismatic-io/spectral";
import {
  executeXmlRequest,
  getDateXmlTags,
  getXmlTagOrEmptyString,
  handleSageError,
} from "../../util";
import { updateInvoiceExamplePayload } from "../../examplePayloads";
import { updateInvoiceInputs } from "../../inputs";
import { updateInvoiceOutputSchema } from "../../outputSchemas";
export const updateInvoice = action({
  display: {
    label: "Update Invoice",
    description: "Updates an invoice.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      keyId,
      customerIdInput,
      dateCreatedInput,
      datePostedInput,
      dateDueInput,
      termNameInput,
      invoiceNumberInput,
      ponumberInput,
      descriptionInput,
      contactNameInput,
      currencyAndExchangeRate,
      attachmentsIdInput,
      customFieldsXmlInput,
      invoiceLineItemsInput,
    },
  ) => {
    const NO_CHARACTERS = 0;
    const action = `
    <update_invoice key="${keyId}">
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
    ${
      dateDueInput.length > NO_CHARACTERS
        ? getDateXmlTags(dateDueInput, "datedue")
        : ""
    }
    ${getXmlTagOrEmptyString("termname", termNameInput)}
    <action>Submit</action>
    ${getXmlTagOrEmptyString("invoiceno", invoiceNumberInput)}
    ${getXmlTagOrEmptyString("ponumber", ponumberInput)}
    ${getXmlTagOrEmptyString("description", descriptionInput)}
    ${
      contactNameInput.length > NO_CHARACTERS
        ? `<payto><contactname>${contactNameInput}</contactname></payto>`
        : ""
    }
    ${
      contactNameInput.length > NO_CHARACTERS
        ? `<returnto><contactname>${contactNameInput}</contactname></returnto>`
        : ""
    }
    ${getXmlTagOrEmptyString("basecurr", currencyAndExchangeRate.baseCurrencyInput)}
    ${getXmlTagOrEmptyString("currency", currencyAndExchangeRate.currencyInput)}
    ${
      currencyAndExchangeRate.exchRateDateInput.length > 0
        ? getDateXmlTags(
            currencyAndExchangeRate.exchRateDateInput,
            "exchratedate",
          )
        : ""
    }
    ${getXmlTagOrEmptyString("exchratetype", currencyAndExchangeRate.exchRateTypeInput)}
    ${getXmlTagOrEmptyString("exchrate", currencyAndExchangeRate.exchRateInput)}
    ${getXmlTagOrEmptyString("supdocid", attachmentsIdInput)}
    ${
      customFieldsXmlInput.length > NO_CHARACTERS
        ? `<customfields>${customFieldsXmlInput}</customfields>`
        : ""
    }
    ${
      invoiceLineItemsInput.length > NO_CHARACTERS
        ? `<updateinvoiceitems>${invoiceLineItemsInput}</updateinvoiceitems>`
        : ""
    }
    </update_invoice>`;
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
  inputs: updateInvoiceInputs,
  examplePayload: updateInvoiceExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateInvoiceOutputSchema,
  }),
  examplePerform: async () => ({ data: updateInvoiceExamplePayload.data }),
});
