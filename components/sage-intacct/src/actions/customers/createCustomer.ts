import { action, outputSchema, util } from "@prismatic-io/spectral";
import {
  assignParametersToObject,
  convertResultToGenericObject,
  executeAction,
} from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import type { AbstractCustomer } from "@intacct/intacct-sdk/dist/Functions/AccountsReceivable";
import { createCustomerExamplePayload } from "../../examplePayloads";
import { createCustomerInputs } from "../../inputs";
import { createCustomerOutputSchema } from "../../outputSchemas";
export const createCustomer = action({
  display: {
    label: "Create Customer",
    description:
      "Creates a customer and specifies a display contact and a contact list (provided via customer contacts).",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customerIdInput,
      customerNameInput,
      oneTimeInput,
      activeInput,
      name,
      companyNameInput,
      printAsInput,
      contactDetails,
      excludedFromContactListInput,
      customerTypeIdInput,
      salesRepEmployeeIdInput,
      parentCustomerIdInput,
      glAccounts,
      territoryIdInput,
      attachmentsIdInput,
      billingPreferences,
      resaleNumberInput,
      taxInfo,
      creditLimitInput,
      onHoldInput,
      commentsInput,
      defaultCurrencyInput,
      printOptions,
      customerContactRoles,
      restrictionTypeInput,
      restrictedLocationsInput,
      restrictedDepartmentsInput,
      customFieldsInput,
    },
  ) => {
    const createCustomer = new Functions.AccountsReceivable.CustomerCreate();
    assignParametersToObject(createCustomer, {
      customerId: customerIdInput,
      customerName: customerNameInput,
      oneTime:
        oneTimeInput === "" ? undefined : util.types.toBool(oneTimeInput),
      active: activeInput === "" ? undefined : util.types.toBool(activeInput),
      lastName: name.lastNameInput,
      firstName: name.firstNameInput,
      middleName: name.middleNameInput,
      prefix: name.prefixInput,
      companyName: companyNameInput,
      printAs: printAsInput,
      primaryPhoneNo: contactDetails.primaryPhoneNoInput,
      secondaryPhoneNo: contactDetails.secondaryPhoneNoInput,
      cellularPhoneNo: contactDetails.cellularPhoneNoInput,
      pagerNo: contactDetails.pagerNoInput,
      faxNo: contactDetails.faxNoInput,
      primaryEmailAddress: contactDetails.primaryEmailAddressInput,
      secondaryEmailAddress: contactDetails.secondaryEmailAddressInput,
      primaryUrl: contactDetails.primaryUrlInput,
      secondaryUrl: contactDetails.secondaryUrlInput,
      addressLine1: contactDetails.addressLine1Input,
      addressLine2: contactDetails.addressLine2Input,
      city: contactDetails.cityInput,
      stateProvince: contactDetails.stateProvinceInput,
      zipPostalCode: contactDetails.zipPostalCodeInput,
      country: contactDetails.countryInput,
      isoCountryCode: contactDetails.isoCountryCodeInput,
      excludedFromContactList:
        excludedFromContactListInput === ""
          ? undefined
          : util.types.toBool(excludedFromContactListInput),
      customerTypeId: customerTypeIdInput,
      salesRepEmployeeId: salesRepEmployeeIdInput,
      parentCustomerId: parentCustomerIdInput,
      glGroupName: glAccounts.glGroupNameInput,
      territoryId: territoryIdInput,
      attachmentsId: attachmentsIdInput,
      paymentTerm: billingPreferences.paymentTermInput,
      offsetArGlAccountNo: glAccounts.offsetArGlAccountNoInput,
      defaultRevenueGlAccountNo: glAccounts.defaultRevenueGlAccountNoInput,
      shippingMethod: billingPreferences.shippingMethodInput,
      resaleNumber: resaleNumberInput,
      taxable:
        taxInfo.taxableInput === ""
          ? undefined
          : util.types.toBool(taxInfo.taxableInput),
      contactTaxGroupName: taxInfo.contactTaxGroupNameInput,
      taxId: taxInfo.taxIdInput,
      creditLimit: creditLimitInput,
      onHold: onHoldInput === "" ? undefined : util.types.toBool(onHoldInput),
      deliveryMethod: billingPreferences.deliveryMethodInput,
      defaultInvoiceMessage: billingPreferences.defaultInvoiceMessageInput,
      comments: commentsInput,
      defaultCurrency: defaultCurrencyInput,
      printOptionArInvoiceTemplateName:
        printOptions.printOptionArInvoiceTemplateNameInput,
      printOptionOeQuoteTemplateName:
        printOptions.printOptionOeQuoteTemplateNameInput,
      printOptionOeOrderTemplateName:
        printOptions.printOptionOeOrderTemplateNameInput,
      printOptionOeListTemplateName:
        printOptions.printOptionOeListTemplateNameInput,
      printOptionOeInvoiceTemplateName:
        printOptions.printOptionOeInvoiceTemplateNameInput,
      printOptionOeAdjustmentTemplateName:
        printOptions.printOptionOeAdjustmentTemplateNameInput,
      printOptionOeOtherTemplateName:
        printOptions.printOptionOeOtherTemplateNameInput,
      primaryContactName: customerContactRoles.primaryContactNameInput,
      billToContactName: customerContactRoles.billToContactNameInput,
      shipToContactName: customerContactRoles.shipToContactNameInput,
      restrictionType: restrictionTypeInput,
      restrictedLocations: restrictedLocationsInput,
      restrictedDepartments: restrictedDepartmentsInput,
      customFields: customFieldsInput,
    } as unknown as AbstractCustomer);
    if (context.debug.enabled) {
      context.logger.debug(JSON.stringify(createCustomer, null, 2));
    }
    const data = await executeAction(connection, createCustomer);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: createCustomerInputs,
  examplePayload: createCustomerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createCustomerOutputSchema,
  }),
  examplePerform: async () => ({ data: createCustomerExamplePayload.data }),
});
