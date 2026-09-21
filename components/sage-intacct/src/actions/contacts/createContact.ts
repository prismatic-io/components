import { action, outputSchema, util } from "@prismatic-io/spectral";
import {
  assignParametersToObject,
  convertResultToGenericObject,
  executeAction,
} from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import type { AbstractContact } from "@intacct/intacct-sdk/dist/Functions/Company";
import { createContactExamplePayload } from "../../examplePayloads";
import { createContactInputs } from "../../inputs";
import { createContactOutputSchema } from "../../outputSchemas";
export const createContact = action({
  display: {
    label: "Create Contact",
    description: "Creates a new contact.",
  },
  performSafety: "notAllowed",
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
  inputs: createContactInputs,
  examplePayload: createContactExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createContactOutputSchema,
  }),
  examplePerform: async () => ({ data: createContactExamplePayload.data }),
});
