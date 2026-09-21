import { action, outputSchema, util } from "@prismatic-io/spectral";
import {
  assignParametersToObject,
  convertResultToGenericObject,
  executeAction,
} from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import type { AbstractVendor } from "@intacct/intacct-sdk/dist/Functions/AccountsPayable";
import { createVendorExamplePayload } from "../../examplePayloads";
import { createVendorInputs } from "../../inputs";
import { createVendorOutputSchema } from "../../outputSchemas";
export const createVendor = action({
  display: {
    label: "Create Vendor",
    description: "Creates a new vendor.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      vendorIdInput,
      vendorNameInput,
      oneTimeInput,
      activeInput,
      name,
      companyNameInput,
      printAsInput,
      contactDetails,
      excludedFromContactListInput,
      vendorTypeIdInput,
      parentVendorIdInput,
      glAccounts,
      taxInfo,
      form1099,
      attachmentsIdInput,
      creditLimitInput,
      onHoldInput,
      paymentSettings,
      commentsInput,
      defaultCurrencyInput,
      vendorContactRoles,
      achDetails,
      vendorAccountNoInput,
      locationAssignedAccountNoDisplayedOnCheckStubInput,
      restrictionTypeInput,
      restrictedLocationsInput,
      restrictedDepartmentsInput,
      customFieldsInput,
    },
  ) => {
    const createVendor = new Functions.AccountsPayable.VendorCreate();
    assignParametersToObject(createVendor, {
      vendorId: vendorIdInput,
      vendorName: vendorNameInput,
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
      vendorTypeId: vendorTypeIdInput,
      parentVendorId: parentVendorIdInput,
      glGroupName: glAccounts.glGroupNameInput,
      taxId: taxInfo.taxIdInput,
      form1099Name: form1099.form1099NameInput,
      form1099Type: form1099.form1099TypeInput,
      form1099Box: form1099.form1099BoxInput,
      attachmentsId: attachmentsIdInput,
      defaultExpenseGlAccountNo: glAccounts.defaultExpenseGlAccountNoInput,
      offsetGlAccountNo: glAccounts.offsetGlAccountNoInput,
      taxable:
        taxInfo.taxableInput === ""
          ? undefined
          : util.types.toBool(taxInfo.taxableInput),
      contactTaxGroupName: taxInfo.contactTaxGroupNameInput,
      creditLimit: creditLimitInput,
      onHold: onHoldInput === "" ? undefined : util.types.toBool(onHoldInput),
      doNotPay:
        paymentSettings.doNotPayInput === ""
          ? undefined
          : util.types.toBool(paymentSettings.doNotPayInput),
      comments: commentsInput,
      defaultCurrency: defaultCurrencyInput,
      primaryContactName: vendorContactRoles.primaryContactNameInput,
      payToContactName: vendorContactRoles.payToContactNameInput,
      returnToContactName: vendorContactRoles.returnToContactNameInput,
      preferredPaymentMethod: paymentSettings.preferredPaymentMethodInput,
      sendAutomaticPaymentNotification:
        paymentSettings.sendAutomaticPaymentNotificationInput === ""
          ? undefined
          : util.types.toBool(
              paymentSettings.sendAutomaticPaymentNotificationInput,
            ),
      mergePaymentRequests:
        paymentSettings.mergePaymentRequestsInput === ""
          ? undefined
          : util.types.toBool(paymentSettings.mergePaymentRequestsInput),
      vendorBillingType: paymentSettings.vendorBillingTypeInput,
      paymentPriority: paymentSettings.paymentPriorityInput,
      paymentTerm: paymentSettings.paymentTermInput,
      termDiscountDisplayedOnCheckStub:
        paymentSettings.termDiscountDisplayedOnCheckStubInput === ""
          ? undefined
          : util.types.toBool(
              paymentSettings.termDiscountDisplayedOnCheckStubInput,
            ),
      achEnabled:
        achDetails.achEnabledInput === ""
          ? undefined
          : util.types.toBool(achDetails.achEnabledInput),
      achBankRoutingNo: achDetails.achBankRoutingNoInput,
      achBankAccountNo: achDetails.achBankAccountNoInput,
      achBankAccountType: achDetails.achBankAccountTypeInput,
      achBankAccountClass: achDetails.achBankAccountClassInput,
      vendorAccountNo: vendorAccountNoInput,
      locationAssignedAccountNoDisplayedOnCheckStub:
        locationAssignedAccountNoDisplayedOnCheckStubInput === ""
          ? undefined
          : util.types.toBool(
              locationAssignedAccountNoDisplayedOnCheckStubInput,
            ),
      restrictionType: restrictionTypeInput,
      restrictedLocations: restrictedLocationsInput,
      restrictedDepartments: restrictedDepartmentsInput,
      customFields: customFieldsInput,
    } as unknown as AbstractVendor);
    if (context.debug.enabled) {
      context.logger.debug(JSON.stringify(createVendor, null, 2));
    }
    const data = await executeAction(connection, createVendor);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: createVendorInputs,
  examplePayload: createVendorExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createVendorOutputSchema,
  }),
  examplePerform: async () => ({ data: createVendorExamplePayload.data }),
});
