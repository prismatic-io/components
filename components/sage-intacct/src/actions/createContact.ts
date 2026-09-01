import { action, util } from "@prismatic-io/spectral";
import {
  connection,
  activeInput,
  companyNameInput,
  contactNameInput,
  contactDetails,
  name,
  printAsInput,
  taxInfo,
} from "../inputs";
import {
  assignParametersToObject,
  convertResultToGenericObject,
  executeAction,
} from "../utils";
import { Functions } from "@intacct/intacct-sdk";
import type { AbstractContact } from "@intacct/intacct-sdk/dist/Functions/Company";
import { createContactPayload } from "../examplePayloads/createContactPayload";
export const createContact = action({
  display: {
    label: "Create Contact",
    description: "Creates a new contact.",
  },
  perform: async (
    context,
    {
      connection,
      activeInput,
      companyNameInput,
      contactNameInput,
      taxInfo,
      contactDetails,
      name,
      printAsInput,
    },
  ) => {
    const createContact = new Functions.Company.ContactCreate();
    assignParametersToObject(createContact, {
      contactName: contactNameInput,
      printAs: printAsInput,
      active: activeInput === "" ? undefined : util.types.toBool(activeInput),
      addressLine1: contactDetails.addressLine1Input,
      addressLine2: contactDetails.addressLine2Input,
      cellularPhoneNo: contactDetails.cellularPhoneNoInput,
      city: contactDetails.cityInput,
      companyName: companyNameInput,
      contactTaxGroupName: taxInfo.contactTaxGroupNameInput,
      country: contactDetails.countryInput,
      faxNo: contactDetails.faxNoInput,
      firstName: name.firstNameInput,
      lastName: name.lastNameInput,
      middleName: name.middleNameInput,
      pagerNo: contactDetails.pagerNoInput,
      prefix: name.prefixInput,
      primaryEmailAddress: contactDetails.primaryEmailAddressInput,
      primaryPhoneNo: contactDetails.primaryPhoneNoInput,
      primaryUrl: contactDetails.primaryUrlInput,
      secondaryEmailAddress: contactDetails.secondaryEmailAddressInput,
      secondaryPhoneNo: contactDetails.secondaryPhoneNoInput,
      secondaryUrl: contactDetails.secondaryUrlInput,
      stateProvince: contactDetails.stateProvinceInput,
      taxId: taxInfo.taxIdInput,
      taxable:
        taxInfo.taxableInput === ""
          ? undefined
          : util.types.toBool(taxInfo.taxableInput),
      zipPostalCode: contactDetails.zipPostalCodeInput,
    } as unknown as AbstractContact);
    if (context.debug.enabled) {
      context.logger.debug(JSON.stringify(createContact, null, 2));
    }
    const data = await executeAction(connection, createContact);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: {
    connection,
    contactNameInput: {
      ...contactNameInput,
      comments: "Contact name to create",
    },
    printAsInput: { ...printAsInput, required: true },
    activeInput,
    companyNameInput,
    name,
    contactDetails,
    taxInfo,
  },
  examplePayload: createContactPayload,
});
