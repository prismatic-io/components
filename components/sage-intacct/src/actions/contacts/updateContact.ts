import { action, outputSchema, util } from "@prismatic-io/spectral";
import {
  assignParametersToObject,
  convertResultToGenericObject,
  executeAction,
} from "../../util";
import { Functions } from "@intacct/intacct-sdk";
import type { AbstractContact } from "@intacct/intacct-sdk/dist/Functions/Company";
import { updateContactExamplePayload } from "../../examplePayloads";
import { updateContactInputs } from "../../inputs";
import { updateContactOutputSchema } from "../../outputSchemas";
export const updateContact = action({
  display: {
    label: "Update Contact",
    description: "Updates an existing contact.",
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
    const updateContact = new Functions.Company.ContactUpdate();
    assignParametersToObject(updateContact, {
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
      context.logger.debug(JSON.stringify(updateContact, null, 2));
    }
    const data = await executeAction(connection, updateContact);
    return {
      data: convertResultToGenericObject(data),
    };
  },
  inputs: updateContactInputs,
  examplePayload: updateContactExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateContactOutputSchema,
  }),
  examplePerform: async () => ({ data: updateContactExamplePayload.data }),
});
