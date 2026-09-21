import { action, outputSchema, util } from "@prismatic-io/spectral";
import {
  assignParametersToObject,
  convertResultToGenericObject,
  executeAction,
} from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import type { AbstractCustomer } from "@intacct/intacct-sdk/dist/Functions/AccountsReceivable";
import { updateCustomerExamplePayload } from "../../examplePayloads";
import { updateCustomerInputs } from "../../inputs";
import { updateCustomerOutputSchema } from "../../outputSchemas";
export const updateCustomer = action({
  display: {
    label: "Update Customer",
    description:
      "Updates an existing customer in Intacct. The customer is identified by the customer ID.",
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
    const updateCustomer = new Functions.AccountsReceivable.CustomerUpdate();
    assignParametersToObject(updateCustomer, {
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
      context.logger.debug(JSON.stringify(updateCustomer, null, 2));
    }
    const data = await executeAction(connection, updateCustomer);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: updateCustomerInputs,
  examplePayload: updateCustomerExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateCustomerOutputSchema,
  }),
  examplePerform: async () => ({ data: updateCustomerExamplePayload.data }),
});
