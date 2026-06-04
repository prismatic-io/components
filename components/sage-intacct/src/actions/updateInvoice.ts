import { action } from "@prismatic-io/spectral";
import {
  executeXmlRequest,
  getDateXmlTags,
  getXmlTagOrEmptyString,
  handleSageError,
} from "../utils";
import {
  attachmentsIdInput,
  baseCurrencyInput,
  connection,
  contactNameInput,
  currencyInput,
  customerIdInput,
  customFieldsXmlInput,
  dateCreatedInput,
  dateDueInput,
  datePostedInput,
  descriptionInput,
  exchRateDateInput,
  exchRateInput,
  exchRateTypeInput,
  invoiceLineItemsInput,
  invoiceNumberInput,
  keyId,
  ponumberInput,
  termNameInput,
} from "../inputs";
import { updateInvoicePayload } from "../examplePayloads/updateInvoicePayload";

export const updateInvoice = action({
  display: {
    label: "Update Invoice",
    description: "Updates an invoice.",
  },
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
      baseCurrencyInput,
      currencyInput,
      exchRateDateInput,
      exchRateTypeInput,
      exchRateInput,
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
    ${getXmlTagOrEmptyString("basecurr", baseCurrencyInput)}
    ${getXmlTagOrEmptyString("currency", currencyInput)}
    ${
      exchRateDateInput.length > 0
        ? getDateXmlTags(exchRateDateInput, "exchratedate")
        : ""
    }
    ${getXmlTagOrEmptyString("exchratetype", exchRateTypeInput)}
    ${getXmlTagOrEmptyString("exchrate", exchRateInput)}
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
  inputs: {
    connection,
    keyId: { ...keyId, dataSource: "selectInvoice" },
    customerIdInput,
    dateCreatedInput: {
      ...dateCreatedInput,
      required: false,
    },
    datePostedInput,
    dateDueInput,
    termNameInput,
    invoiceNumberInput: {
      ...invoiceNumberInput,
      required: false,
    },
    ponumberInput,
    descriptionInput: {
      ...descriptionInput,
      required: false,
      comments: "The description of the invoice.",
      example: "Some description",
    },
    contactNameInput: {
      ...contactNameInput,
      required: false,
    },
    baseCurrencyInput,
    currencyInput,
    exchRateDateInput,
    exchRateTypeInput: {
      ...exchRateTypeInput,
      comments: "The exchange rate type. Do not use if exchrate is set.",
    },
    exchRateInput,
    attachmentsIdInput,
    customFieldsXmlInput,
    invoiceLineItemsInput: {
      ...invoiceLineItemsInput,
      required: false,
      comments:
        "To update an existing line use <updatelineitem></updatelineitem> " +
        "otherwise to create a new line item use <lineitem></lineitem> instead." +
        "You can mix types in the array.",
    },
  },
  examplePayload: updateInvoicePayload,
});
